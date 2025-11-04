import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useNotes } from "../../contexts/NotesContext";
import { useNotifications } from "../../hooks/useNotifications";
import { useNoteEditor } from "../../contexts/NoteEditorContext";
import { handleSaveNote } from "../../services/notes";

interface SaveButtonProps {
  className?: string;
  isNewNote?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  className,
  isNewNote,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { notes, addNote, updateNote } = useNotes();
  const { showSuccess } = useNotifications();
  
  // Get all data directly from useNoteEditor
  const { title, tags, content, note } = useNoteEditor();

  // Determine if this is a new note
  const isCreatingNewNote = isNewNote ?? location.pathname.endsWith("/New_Note");

  const handleSave = () => {
    handleSaveNote({
      title,
      tags,
      content,
      note: note ?? null,
      notes,
      isNewNote: isCreatingNewNote,
      noteId: id ? Number(id) : undefined,
      addNote,
      updateNote,
      navigate,
      showSuccess,
    });
  };

  return (
    <button onClick={handleSave} className={className || "px-4 py-2 rounded bg-linear-to-r from-(--color-primary) to-[#60a5fa] text-(--color-primary-foreground)] shadow-sm"}>
      Save Note
    </button>
  );
};

