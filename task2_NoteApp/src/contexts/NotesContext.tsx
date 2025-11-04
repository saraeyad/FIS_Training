import React, { createContext, useContext, useEffect, useState } from "react";
import type { Note } from "../types";
import data from "../../data.json";

type NotesContextValue = {
  notes: Note[];
  addNote: (payload: Omit<Note, "lastEdited">) => number;
  updateNote: (id: number, payload: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  toggleArchive: (id: number) => void;
};

// Constant key for localStorage - used to store notes in browser's local storage
const STORAGE_KEY = "Notes";


const NotesContext = createContext<NotesContextValue | undefined>(undefined);

// Helper function to normalize a single note
const normalizeNote = (note: any, index: number): Note => ({
  id: note.id ?? index,
  title: note.title || "Untitled",
  tags: Array.isArray(note.tags) ? note.tags : [],
  content: note.content || "",
  lastEdited: note.lastEdited || new Date().toISOString(),
  isArchived: Boolean(note.isArchived),
});

const getInitialNotes = (): Note[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const notes = saved ? JSON.parse(saved) : data.notes;
    return notes.map(normalizeNote);
    
  } catch {
    return data.notes.map(normalizeNote);
  }
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children, 
}) => {
  const [notes, setNotes] = useState<Note[]>(getInitialNotes);
  
  useEffect(() => {
    // Save notes to browser's local storage whenever they update
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    console.log("render", {notes});
  }, [notes]); 



  const addNote = (payload: Omit<Note, "lastEdited">) => {
    const newNote: Note = { ...payload, lastEdited: new Date().toISOString() };
    // The new note will be at index 0 (first position)
    let newIndex = 0;
    setNotes((prev) => {
      return [newNote, ...prev];
    });
    console.log("newIndex", newIndex);
    return newIndex;
  };

  const updateNote = (id: number, payload: Partial<Note>) => {
    // Update notes state
    setNotes((prev) => {
      const index = prev.findIndex((n) => n.id === id);
      console.log("index", index);
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = {
        ...updated[index], // Keep existing properties
        ...payload, // Override with new properties
        lastEdited: new Date().toISOString(),
      };
      return updated;
    });
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleArchive = (id: number) => {
    // Update notes state
    setNotes((prev) => {
      const index = prev.findIndex((n) => n.id === id);
      if (index < 0 || index >= prev.length) return prev; // Return unchanged if invalid
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        isArchived: !updated[index].isArchived,
        lastEdited: new Date().toISOString(),
      };
      return updated;
    });
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, toggleArchive }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  
  return ctx;
};

export default NotesContext;
