import { MdOutlineArchive, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { useState } from "react";
import type { Note } from "../../types";
import { ConfirmModal } from "../modals/ConfirmModal";
import { useNotes } from "../../contexts/NotesContext";
import { useNotifications } from "../../hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { handleArchiveNote } from "../../services/notes";

export const ArchiveButton = ({ note }: { note: Note } ) => {
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const { notes, toggleArchive } = useNotes();
    const { showSuccess } = useNotifications(); 
    const navigate = useNavigate();

    const handleToggleArchive = () => {
        handleArchiveNote({
            note,
            notes,
            toggleArchive,
            navigate,
            showSuccess,
        });
    };
    return (
        <>
        <div>
        <button
          onClick={() => setShowArchiveModal(true)}
          className="flex items-center gap-4 border-2 font-medium border-(--color-border) rounded-md px-3 py-2 w-55 text-l hover:bg-(--color-accent) hover:border-(--color-primary) transition-colors text-(--color-text)"
        >
          {note.isArchived ? (
            <MdOutlineSettingsBackupRestore className="right-3 top-2.5" />
          ) : (
            <MdOutlineArchive className="right-3 top-2.5" />
          )}
          {note.isArchived ? "Restore Note" : "Archive Note"}
        </button>
      </div>
      <ConfirmModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={handleToggleArchive}
        title={note.isArchived ? "Restore Note" : "Archive Note"}
        message={note.isArchived
          ? `Are you sure you want to restore "${note.title}"You can find it in the ALL Notes section and restore it anytime ?`
          : `Are you sure you want to archive "${note.title}"You can find it in the Archived Notes section and restore it anytime ?`}
        confirmText={note.isArchived ? "Restore" : "Archive"}
        type="archive"
      />
      </>
    );
};