import React from "react";
import { formatDateDetailed } from "../../lib";
import type { Note } from "../../types";

interface NoteItemProps {
  note: Note;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}

/**
 * Reusable note list item component
 * Displays note title, tags, and last edited date
 */
export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  isActive,
  isLast,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 m-2 md:p-4 ${
        isLast ? "" : "border-b border-(--color-border)"
      } cursor-pointer transition-colors rounded-md
        ${
          isActive
            ? "bg-(--color-accent) border-2 border-(--color-primary)"
            : "hover:bg-(--color-accent) hover:border-(--color-primary)"
        }
      `}
    >
      <h2
        className={`text-base md:text-base font-semibold mb-2 ${
          isActive ? "text-(--color-text)" : "text-(--color-text)"
        }`}
      >
        {note.title}
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {note.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
              isActive
                ? "bg-(--color-accent) text-(--color-text)"
                : "bg-(--color-accent) text-(--color-text)"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <p
        className={`text-xs ${
          isActive ? "text-(--color-text)" : "text-(--color-text)"
        }`}
      >
        {formatDateDetailed(note.lastEdited)}
      </p>
    </div>
  );
};

