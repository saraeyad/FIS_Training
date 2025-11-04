// ============================================
// Core Types
// ============================================

export interface Note {
  id: number;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

// ============================================
// Component Props
// ============================================

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

export interface NoteListProps {
  showArchived?: boolean;
}

// ============================================
// Service Types
// ============================================

export interface SaveNoteParams {
  title: string;
  tags: string;
  content: string;
  note: Note | null;
  notes: Note[];
  isNewNote: boolean;
  noteId?: number;
  addNote: (payload: Omit<Note, "lastEdited">) => number;
  updateNote: (id: number, payload: Partial<Note>) => void;
  navigate: (path: string) => void;
  showSuccess: (message: string) => void;
}

export interface ArchiveNoteParams {
  note: Note;
  notes: Note[];
  toggleArchive: (id: number) => void;
  navigate: (path: string) => void;
  showSuccess: (message: string) => void;
}

export interface CancelNoteParams {
  note: Note | null;
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  setContent: (content: string) => void;
  navigate: (path: string) => void;
}

export interface DeleteNoteParams {
  note: Note;
  deleteNote: (id: number) => void;
  navigate: (path: string) => void;
  showSuccess: (message: string) => void;
}

export interface SearchNotesParams {
  notes: Note[];
  searchQuery: string;
}
