import { FaSearch } from "react-icons/fa";
import { useNotes } from "../../contexts/NotesContext";
import { ROUTES } from "../../router/routes";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchNotes } from "../../services/notes/searchNotes";
import { SearchDropDown } from "../ui/SearchDropDown";

export const SearchButton = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { notes } = useNotes();
  const navigate = useNavigate();

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const searchedNotes = searchNotes({ notes, searchQuery });
    return searchedNotes.map((note) => ({ note, index: note.id }));
  }, [searchQuery, notes]);

  const handleNoteClick = (id: number) => {
    // Find the note to determine if it's archived
    const note = notes.find(n => n.id === id);
    const baseRoute = note?.isArchived ? ROUTES.ARCHICED : ROUTES.AllNOTE;
    navigate(`${baseRoute}/note/${id}`);
    setSearchQuery(""); // Clear search after navigation
  };

  return (
    <div className="relative">
    <FaSearch className="absolute right-3 top-2.5 text-(--color-text)" />
    <input
      type="text"
      placeholder="Search by title, content, or tags..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-(--color-surface) border border-(--color-border) rounded-md px-3 py-2 w-80 text-sm text-(--color-text) placeholder-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
    />
    
    <SearchDropDown searchQuery={searchQuery} filteredNotes={filteredNotes} handleNoteClick={handleNoteClick} />
  </div>
  );
}