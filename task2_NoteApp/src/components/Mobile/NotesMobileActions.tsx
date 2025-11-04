import { useLocation } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { MobileDeleteButton } from "./MobileDeleteButton";
import { MobileArchiveButton } from "./MobileArchiveButton";
import { SaveButton } from "../buttons/SaveButton";
import { CancelButton } from "../buttons/CancelButton";
import { useNoteEditor } from "../../contexts/NoteEditorContext";

export const NotesMobileActions = () => {
  const location = useLocation();
  const { note } = useNoteEditor();
  
  const isValidNote = note !== null;

  // Only show actions when viewing a note detail
  if (!location.pathname.includes("/note/") || location.pathname === ROUTES.NEW_NOTE) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Show delete and archive only for existing notes */}
      {isValidNote && note && (
        <>
          <MobileDeleteButton note={note} />
          <MobileArchiveButton note={note} />
        </>
      )}
      
      {/* Mobile Cancel Button */}
      <CancelButton
        className="px-4 py-1.5 bg-transparent hover:text-(--color-text) text-(--color-text) font-bold"
      />
      
      {/* Mobile Save Button */}
      <SaveButton
        className="px-4 py-1.5 bg-transparent font-medium text-(--color-primary) "
      />
    </div>
  );
};
