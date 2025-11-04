import { ROUTES } from "../../router/routes";
import type { CancelNoteParams } from "../../types";

//Handles canceling note edit

export const handleCancelNote = ({
  note,
  setTitle,
  setTags,
  setContent,
  navigate,
}: CancelNoteParams) => {
  // Reset to original values if editing an existing note
  if (note) {
    setTitle(note.title);
    setTags(note.tags.join(", "));
    setContent(note.content);
  }
  navigate(ROUTES.AllNOTE);
};


