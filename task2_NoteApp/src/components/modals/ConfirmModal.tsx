import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "delete" | "archive";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete",
}) => {
  if (!isOpen) return null;

  const isDelete = type === "delete";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg)/50 backdrop-blur-xxs">
      <div className="bg-(--color-surface) rounded-lg shadow-2xl w-full max-w-sm mx-4 border border-(--color-border)">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-(--color-border)">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDelete
                ? "bg-(--color-accent)"
                : "bg-(--color-accent)"
            }`}
          >
            <HiOutlineExclamationTriangle
              className={`w-6 h-6 ${
                isDelete
                  ? "text-(--color-text)"
                  : "text-(--color-text)"
              }`}
            />
          </div>
          <h2 className="text-xl font-semibold text-(--color-text)">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-(--color-text)">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-(--color-border)">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-(--color-text) hover:bg-(--color-accent) transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
              isDelete
                ? "bg-(--color-primary) hover:bg-(--color-primary)"
                : "bg-(--color-primary) hover:bg-(--color-primary)"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

