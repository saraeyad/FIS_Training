import React, { useCallback } from "react";
import type { NoteListProps } from "../../types";
import { getNoteIdFromPath, getBaseRoute } from "../../lib";
import { CreateNote } from "../../components/buttons/CreateNoteButton";
import { NoteItem } from "../../components/notes/NoteItem";
import { useNotes } from "../../contexts/NotesContext";
import { useNavigation } from "../../hooks/useNavigation";
import { useNotesFilter } from "../../hooks/useNotesFilter";


export const NoteList: React.FC<NoteListProps> = ({
  showArchived = false, 
}: NoteListProps) => {
 
  const { notes } = useNotes();
  const { location, navigateTo } = useNavigation();
  const { filteredNotes } = useNotesFilter(showArchived);

  // Get the current note id from the pathname using utility function
  const currentNoteId = getNoteIdFromPath(location.pathname);
  const currentNote = currentNoteId !== null ? notes.find(n => n.id === currentNoteId) ?? null : null;


  
  const handleNoteClick = useCallback(
    (id: number) => {
      const baseRoute = getBaseRoute(location.pathname);
      const detailRoute = `${baseRoute}/note/${id}`;
      const params = new URLSearchParams(location.search);
      navigateTo(detailRoute, params.toString() ? params : undefined);
    },
    [navigateTo, location.pathname, location.search]
  );



  return (
    <div className=" text-(--color-text) transition-colors">
      <div className="m-2 hidden xl:block">
        <CreateNote />
      </div>
    
      <div className="w-full p-1 md:p-1 flex flex-col bg-(--color-bg)">
        {filteredNotes.map(({ note }, index) => (
          <NoteItem
            key={note.id}
            note={note}
            isActive={currentNote?.id === note.id}
            isLast={index === filteredNotes.length - 1}
            onClick={() => handleNoteClick(note.id)}
          />
        ))}
      </div>
    </div>
  );
};
