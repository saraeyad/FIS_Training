import type { Note, SearchNotesParams } from "../../types";

/**
 * Filters notes based on search query
 */
export const searchNotes = ({ notes, searchQuery }: SearchNotesParams): Note[] => {
  if (!searchQuery.trim()) return notes; // Show all notes if no search query
  
  const query = searchQuery.toLowerCase();
  return notes.filter((note) =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query) ||
    note.tags.some((tag) => tag.toLowerCase().includes(query))
  );
};

