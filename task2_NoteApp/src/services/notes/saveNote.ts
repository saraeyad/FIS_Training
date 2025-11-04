import { ROUTES } from "../../router/routes";
import type { Note, SaveNoteParams } from "../../types";

// Helper function to parse tags string into array
const parseTags = (tags: string): string[] => {
  return tags ? tags.split(",").map((t) => t.trim()) : [];
};

// Helper function to create note payload from form data
const createNotePayload = (
  title: string,
  tags: string,
  content: string,
  isArchived: boolean = false
) => ({
  title: title || "Untitled",
  tags: parseTags(tags),
  content,
  isArchived,
});

export const handleSaveNote = ({
  title,
  tags,
  content,
  note,
  notes,
  isNewNote,
  noteId,
  addNote,
  updateNote,
  navigate,
  showSuccess,
}: SaveNoteParams) => {
  const payload = createNotePayload(
    title,
    tags,
    content,
    note?.isArchived ?? false
  );

  if (isNewNote) {
    // Generate next available ID
    const nextId =
      notes.length === 0 ? 0 : Math.max(...notes.map((n) => n.id)) + 1;
    addNote({ ...payload, id: nextId });
    showSuccess("Note created successfully ✓");
    navigate(`${ROUTES.AllNOTE}/note/${nextId}`);
  } else {
    // Update existing note
    const id = noteId ?? note?.id;
    if (id !== null && id !== undefined) {
      updateNote(id, payload);
      showSuccess("Note updated successfully ✓");
      navigate(ROUTES.AllNOTE);
    }
  }
};


