import type { Note } from "../../types";

interface SearchDropDownProps {
    searchQuery: string;
    filteredNotes: { note: Note; index: number }[];
    handleNoteClick: (id: number) => void;
}

export const SearchDropDown = ({ searchQuery, filteredNotes, handleNoteClick }: SearchDropDownProps) => {
    return (
        <>
        {searchQuery.trim() && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-(--color-surface) border border-(--color-border) rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
              {filteredNotes.length > 0 ? (
                filteredNotes.map(({ note, index }) => (
                  <div
                    key={index}
                    onClick={() => handleNoteClick(note.id)}
                    className="p-4 border-b border-(--color-border) cursor-pointer hover:bg-(--color-accent) transition-colors"
                  >
                    <h3 className="font-semibold text-(--color-text) mb-1">{note.title}</h3>
                    <p className="text-xs pl-1.5 text-(--color-text-2) line-clamp-2">{note.content}</p>
                    <div className="mt-2 flex flex-wrap gap-1 pl-2">
                      {note.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-(--color-accent) text-(--color-text) px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-(--color-text) mb-4">
                    No notes match your search. Try a different keyword or create a new note.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
    )
}