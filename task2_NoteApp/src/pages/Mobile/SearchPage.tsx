import { useState, useMemo } from "react";
import { useNotes } from "../../contexts/NotesContext";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ROUTES } from "../../router/routes";
import { searchNotes } from "../../services/notes/searchNotes";
import { NoteItem } from "../../components/notes/NoteItem";

export const SearchPage = () => {
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter notes using search service
  const filteredNotes = useMemo(
    () => searchNotes({ notes, searchQuery }),
    [notes, searchQuery]
  );

  const handleNoteClick = (id: number) => {
    // Find the note to determine if it's archived
    const note = notes.find(n => n.id === id);
    const baseRoute = note?.isArchived ? ROUTES.ARCHICED : ROUTES.AllNOTE;
    navigate(`${baseRoute}/note/${id}`);
  };

  return (
    <div className="px-4 py-6 pb-24">
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-(--color-text) w-5 h-5" />
        <input
          type="text"
          placeholder="Search by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-(--color-surface) border border-(--color-border) rounded-lg px-12 py-3 text-(--color-text) placeholder-(--color-text) focus:outline-none focus:border-(--color-primary)"
        />
      </div>

      {/* Results */}
      <div className="space-y-0">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <NoteItem
              key={note.id}
              note={note}
              isActive={false}
              isLast={index === filteredNotes.length - 1}
              onClick={() => handleNoteClick(note.id)}
            />
          ))
        ) : (
          <div className="text-center text-(--color-text) py-8">
            {searchQuery.trim()
              ? `No notes found matching "${searchQuery}"`
              : "No notes available"}
          </div>
        )}
      </div>
    </div>
  );
};

