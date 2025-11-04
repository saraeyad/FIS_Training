import React from "react";
import { useNavigate } from "react-router-dom";
import { useNoteEditor } from "../../contexts/NoteEditorContext";
import { handleCancelNote } from "../../services/notes";

interface CancelButtonProps {
  className?: string;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  className = "px-4 py-2 rounded transition-colors font-medium bg-(--color-accent) hover:border-(--color-primary)"
}) => {
  const navigate = useNavigate();
  const { setTitle, setTags, setContent, note } = useNoteEditor();

  const handleCancel = () => {
    handleCancelNote({      
      note: note ?? null,
      setTitle,
      setTags,
      setContent,
      navigate,
    });
  };

  return (
    <button
      onClick={handleCancel}
      className={className}
    >
      Cancel
    </button>
  );
};

