import { ROUTES } from "../../router/routes";
import type { ArchiveNoteParams } from "../../types";

// Handles archiving/restoring a note

export const handleArchiveNote = ({
  note,
  notes,
  toggleArchive,
  navigate,
  showSuccess,
}: ArchiveNoteParams) => {
  // Verify note exists before archiving
  const exists = notes.some((n) => n.id === note.id);
  if (!exists) return;

  const wasArchived = note.isArchived;
  toggleArchive(note.id);
  
  if (wasArchived) {
    showSuccess("Note restored successfully ");
    navigate(`${ROUTES.AllNOTE}/note/${note.id}`);
  } else {
    showSuccess("Note archived successfully ");
    navigate(`${ROUTES.ARCHICED}/note/${note.id}`);
  }
};


