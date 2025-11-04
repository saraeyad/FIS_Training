import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import type { Note } from "../../types";
import { ConfirmModal } from "../modals/ConfirmModal";
import { handleDeleteNote } from "../../services/notes";
import { useNotes } from "../../contexts/NotesContext";
import { useNotifications } from "../../hooks/useNotifications";
import { useNavigate } from "react-router-dom";

interface MobileDeleteButtonProps {
  note: Note;
}

export const MobileDeleteButton: React.FC<MobileDeleteButtonProps> = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote } = useNotes();
  const { showSuccess } = useNotifications();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    handleDeleteNote({
      note,
      deleteNote,
      navigate,
      showSuccess,
    });
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="p-2 text-(--color-text) hover:text-(--color-text) transition-colors"
        aria-label="Delete Note"
      >
        <HiOutlineTrash className="w-5 h-5" />
      </button>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Note"
        message={`Are you sure you want to delete this note "${note.title}"? `}
        confirmText="Delete"
        type="delete"
      />
    </>
  );
};

