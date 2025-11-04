import { ArchiveButton } from "../buttons/ArchiveButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { useLocation } from "react-router-dom";
import { useNotes } from "../../contexts/NotesContext";
import { getNoteIdFromPath, findNoteById } from "../../lib";

export const NotesActions: React.FC = () => {
  const location = useLocation();
  const { notes } = useNotes();
  
  // Get note id from pathname
  const id = getNoteIdFromPath(location.pathname);
  const note = id !== null ? findNoteById(notes, id) ?? null : null;

  // Check if note exists
  if (!note) {
    return <div className="p-4" />;
  }

  return (
    <div className="p-5 flex flex-col gap-4 bg-transparent text-(--color-text) transition-colors">
      <ArchiveButton note={note} />
      <DeleteButton note={note} />
    </div>
  );
};
