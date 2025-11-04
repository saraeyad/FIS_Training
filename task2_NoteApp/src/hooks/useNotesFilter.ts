import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useNotes } from "../contexts/NotesContext";

export const useNotesFilter = (showArchived: boolean = false) => {
  const { notes } = useNotes();
  const location = useLocation();

  // Map notes with their original indices
  const notesWithIndex = useMemo(
    () => notes.map((note, index) => ({ note, index })),
    [notes]
  );

  // Filter notes by archived status and tags
  const filteredNotes = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const selectedTags = params.getAll("tag");

    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      return notesWithIndex.filter(
        ({ note }) =>
         selectedTags.some((tag) => note.tags.includes(tag))
      );
    }

    // Just filter by archived status
    return notesWithIndex.filter(({ note }) =>
      showArchived ? note.isArchived : !note.isArchived
    );
  }, [notesWithIndex, showArchived, location.search]);

  return { filteredNotes };
};

