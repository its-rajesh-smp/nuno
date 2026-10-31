import type { AppState, Note, NoteDraft, NoteMeta, NoteUpdate } from '@/features/notes/types/note';
import { localStorageAdapter } from './localStorageAdapter';

// Everything the app needs from persistence. Services only talk to this interface,
// so a synced backend can replace the local one without touching the UI.
export interface NotesStorage {
  listNotes: () => Promise<NoteMeta[]>;
  getNote: (id: string) => Promise<Note | null>;
  createNote: (draft?: NoteDraft) => Promise<Note>;
  saveNote: (update: NoteUpdate) => Promise<NoteMeta | null>;
  /** Must finish synchronously: it runs while the tab is closing. */
  saveNoteSync: (update: NoteUpdate) => NoteMeta | null;
  deleteNote: (id: string) => Promise<void>;
  getState: () => Promise<AppState>;
  setState: (patch: AppState) => Promise<void>;
}

export const storage: NotesStorage = localStorageAdapter;
