import type { AppState, Note, NoteMeta } from '@/features/notes/types/note';
import type { NotesStorage } from './storage';

// Notes live in this browser's localStorage, one key per note.
const NOTE_PREFIX = 'zodnote:note:';
const STATE_KEY = 'zodnote:state';

const noteKey = (id: string) => `${NOTE_PREFIX}${id}`;
const toMeta = ({ id, title, createdAt, updatedAt }: Note): NoteMeta => ({ id, title, createdAt, updatedAt });

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') {
      throw new Error('Browser storage is full. Delete a few notes to keep saving.');
    }
    throw err;
  }
}

const readNote = (id: string) => read<Note | null>(noteKey(id), null);

function saveNoteSync({ id, title, content }: { id: string; title: string; content: string }) {
  const note = readNote(id);
  if (!note) return null;
  const updated: Note = { ...note, title, content, updatedAt: Date.now() };
  write(noteKey(id), updated);
  return toMeta(updated);
}

export const localStorageAdapter: NotesStorage = {
  listNotes: async () =>
    Object.keys(localStorage)
      .filter((key) => key.startsWith(NOTE_PREFIX))
      .map((key) => read<Note | null>(key, null))
      .filter((note): note is Note => note !== null)
      .map(toMeta)
      .sort((a, b) => b.updatedAt - a.updatedAt),

  getNote: async (id) => readNote(id),

  createNote: async ({ title = '', content = '' } = {}) => {
    const now = Date.now();
    const note: Note = { id: crypto.randomUUID(), title, content, createdAt: now, updatedAt: now };
    write(noteKey(note.id), note);
    return note;
  },

  saveNote: async (update) => saveNoteSync(update),
  saveNoteSync,

  deleteNote: async (id) => localStorage.removeItem(noteKey(id)),

  getState: async () => read<AppState>(STATE_KEY, {}),
  setState: async (patch) => write(STATE_KEY, { ...read<AppState>(STATE_KEY, {}), ...patch }),
};
