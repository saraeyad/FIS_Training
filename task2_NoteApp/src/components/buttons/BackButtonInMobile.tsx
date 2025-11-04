import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { useNavigation } from "../../hooks/useNavigation";

interface BackButtonProps {
  className?: string;
  showText?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className,
  showText = true,
}) => {
  const { goBack, location } = useNavigation();
  const isInNoteDetail = location.pathname.includes("/note/") && location.pathname !== "/All-NOTE/note/New_Note";
  const isInTaggedNotes = location.pathname.includes("/TaggedNote") && location.search.includes("tag=");
  const shouldShow = isInNoteDetail || isInTaggedNotes;
  
  if (!shouldShow) {
    return null;  
  }

  const defaultClassName = showText
    ? "flex items-center gap-1 text-(--color-text) hover:text-(--color-text) transition-colors"
    : "flex items-center gap-1 px-3 py-2 text-(--color-text) hover:text-(--color-text) transition-colors";

  return (
    <button onClick={goBack} className={className || defaultClassName}>
      <div className="flex items-center gap-1">
      <HiOutlineChevronLeft className="w-5 h-5" />
      {showText && <span>Go Back</span>}
      </div>
    </button>
  );
};

