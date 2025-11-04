import { ROUTES } from "../../router/routes";
import type { DeleteNoteParams } from "../../types";

// Handles deleting a note

export const handleDeleteNote = ({
  note,
  deleteNote,
  navigate,
  showSuccess,
}: DeleteNoteParams) => {
  deleteNote(note.id);
  showSuccess("Note deleted successfully ✓");
  navigate(ROUTES.AllNOTE);
};


