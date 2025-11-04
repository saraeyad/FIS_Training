import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNotes } from "./NotesContext";
import { getNoteIdFromPath, findNoteById } from "../lib";

interface NoteEditorContextValue {
  title: string;
  setTitle: (title: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  content: string;
  setContent: (content: string) => void;
  note: ReturnType<typeof useNotes>["notes"][0] | null;
}

const NoteEditorContext = createContext<NoteEditorContextValue | undefined>(undefined);

export const NoteEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { notes } = useNotes();
  
  const id = getNoteIdFromPath(location.pathname);
  const note = id !== null ? findNoteById(notes, id) ?? null : null;
  
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [lastSyncedNoteId, setLastSyncedNoteId] = React.useState<number | null>(null);
  
  // Sync with note only when navigating to a different note (ID changes)
  useEffect(() => {
    const currentNoteId = note?.id ?? null;
    
    // Only sync if navigating to a different note
    if (currentNoteId !== lastSyncedNoteId) {
      if (note) {
        setTitle(note.title);
        setTags(note.tags.join(", "));
        setContent(note.content);
        setLastSyncedNoteId(note.id);
      } else if (id === null) {
        // Reset if no note and we're not on a note detail page
        setTitle("");
        setTags("");
        setContent("");
        setLastSyncedNoteId(null);
      }
    }
  }, [id, note, lastSyncedNoteId]);

  return (
    <NoteEditorContext.Provider
      value={{
        title,
        setTitle,
        tags,
        setTags,
        content,
        setContent,
        note,
      }}
    >
      {children}
    </NoteEditorContext.Provider>
  );
};

export const useNoteEditor = () => {
  const ctx = useContext(NoteEditorContext);
  if (!ctx) throw new Error("useNoteEditor must be used within NoteEditorProvider");
  return ctx;
};

