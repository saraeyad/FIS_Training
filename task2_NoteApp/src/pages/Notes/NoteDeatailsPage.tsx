// pages/NoteDetails.tsx
import { useLocation } from "react-router-dom";
import { formatDateDetailed } from "../../lib";
import { HiOutlineTag } from "react-icons/hi";
import { TbClockHour4 } from "react-icons/tb";
import { MdOutlineArchive } from "react-icons/md";
import { SaveButton } from "../../components/buttons/SaveButton";
import { CancelButton } from "../../components/buttons/CancelButton";
import { useNoteEditor } from "../../contexts/NoteEditorContext";
import { ROUTES } from "../../router/routes";

export const NoteDetails = () => {
  const location = useLocation();
  const { title, setTitle, tags, setTags, content, setContent, note } = useNoteEditor();
  
  const isNewNote = location.pathname === ROUTES.NEW_NOTE;
  const isCreatingNote = isNewNote || !note;
  
  // Show error only if editing existing note that doesn't exist
  if (!isCreatingNote && !note) {
    return <div className="px-6 py-5">Note not found</div>;
  }

  return (
    <div className={`${isCreatingNote ? 'p-1 m-1 min-h-screen bg-(--color-surface) rounded-md' : 'px-6 py-5'} text-(--color-text) flex flex-col min-h-full`}>

      <div className="mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full bg-transparent ${isCreatingNote ? 'text-2xl' : 'text-3xl'} font-bold mb-0 focus:outline-none`}
          placeholder={isCreatingNote ? "Enter a title..." : "Untitled"}
        />
      </div>
      <div className={`text-sm text-(--color-text) ${isCreatingNote ? 'py-5' : 'pb-6'} border-b border-(--color-border) ${isCreatingNote ? 'grid grid-cols-[150px_1fr] gap-2' : 'space-y-3'}`}>
        {isCreatingNote ? (
          <>
            <div className="flex flex-col gap-2">
              <div>
                <HiOutlineTag className="inline-block w-5 h-5 mr-2" /> Tags
              </div>
              <div>
                <TbClockHour4 className="inline-block w-5 h-5 mr-2" /> Last edited
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-transparent focus:outline-none placeholder-(--color-text)"
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
              />
              <p className="text-(--color-text)">{note ? formatDateDetailed(note.lastEdited) : "Not yet saved"}</p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-[0.2fr_0.2fr] items-center gap-2">
              <span className="text-(--color-text) font-bold flex items-center">
                <HiOutlineTag className="inline-block w-5 h-5 mr-2 text-(--brand-text)" />
                Tags
              </span>
              <div className="mt-2">  
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-transparent focus:outline-none w-full text-(--color-text)"
                  placeholder="Add tags..."
                />
              </div>
            </div>
            <div className="grid grid-cols-[0.2fr_0.3fr] items-center gap-2">
              <span className="text-(--color-text) font-bold flex items-center">
                <MdOutlineArchive className="inline-block w-5 h-5 mr-2 text-(--brand-text)" />
                Status
              </span>
              <div className="mt-2 text-(--color-text)">
                {note.isArchived ? "Archived" : "Active"}
              </div>
            </div>
            <div className="grid grid-cols-[0.2fr_0.3fr] items-center gap-2">
              <span className="text-(--color-text) font-bold flex items-center">
                <TbClockHour4 className="inline-block w-5 h-5 mr-2 text-(--brand-text)" />
                Last edited
              </span>
              <div className="mt-2 text-(--color-text)">{formatDateDetailed(note.lastEdited)}</div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full bg-transparent focus:outline-none ${isCreatingNote ? 'text-sm min-h-[60vh]' : 'text-base min-h-[700px]'} leading-relaxed resize-none text-(--color-text)`}
          placeholder={isCreatingNote ? "Start typing your note here..." : "Start typing..."}
        />
      </div>

      {/* Save/Cancel Buttons at bottom - Hidden on mobile (xl:hidden) */}
      <div className={`${isCreatingNote ? 'flex' : 'hidden xl:flex'} mt-6 p-5 items-center gap-3 border-t border-(--color-border) bg-transparent`}>
        <SaveButton isNewNote={isNewNote} />
        <CancelButton />
      </div>
    </div>
  );
};
