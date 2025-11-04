import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNotifications } from "../../hooks/useNotifications";
import { ConfirmModal } from "../modals/ConfirmModal";
import { useState } from "react";
import { useNotes } from "../../contexts/NotesContext";
import { useNavigate } from "react-router-dom";
import type { Note } from "../../types";
import { handleDeleteNote } from "../../services/notes";

export const DeleteButton = ({ note }: { note: Note }) => {
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
        <div>
            <div>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className=" flex items-center gap-4 border-2 font-medium border-(--color-border) rounded-md px-3 py-2 w-55 text-l hover:bg-(--color-accent) hover:border-(--color-primary) transition-colors text-(--color-text)"
                >
                    <MdOutlineDeleteOutline className="right-3 top-2.5" />
                    Delete Note
                </button>
            </div>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Note"
                message={`Are you sure you want to delete this note "${note.title}"`}
                confirmText="Delete"
                type="delete"
            />
        </div>
    );
};