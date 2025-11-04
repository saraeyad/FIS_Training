import { MdOutlineArchive, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { useState } from "react";
import type { Note } from "../../types";
import { ConfirmModal } from "../modals/ConfirmModal";
import { handleArchiveNote } from "../../services/notes";
import { useNotes } from "../../contexts/NotesContext";
import { useNotifications } from "../../hooks/useNotifications";
import { useNavigate } from "react-router-dom";

interface MobileArchiveButtonProps {
  note: Note;
}

export const MobileArchiveButton: React.FC<MobileArchiveButtonProps> = ({ note }) => {
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
      <button
        onClick={() => setShowArchiveModal(true)}
        className="p-2 text-(--color-text) hover:text-(--color-text) transition-colors"
        aria-label={note.isArchived ? "Restore Note" : "Archive Note"}
      >
        {note.isArchived ? (
          <MdOutlineSettingsBackupRestore className="w-5 h-5" />
        ) : (
          <MdOutlineArchive className="w-5 h-5" />
        )}
      </button>
      <ConfirmModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={handleToggleArchive}
        title={note.isArchived ? "Restore Note" : "Archive Note"}
        message={note.isArchived
          ? `Are you sure you want to restore "${note.title}"? You can find it in the ALL Notes section and restore it anytime.`
          : `Are you sure you want to archive "${note.title}"? You can find it in the Archived Notes section and restore it anytime.`}
        confirmText={note.isArchived ? "Restore" : "Archive"}
        type="archive"
      />
    </>
  );
};

