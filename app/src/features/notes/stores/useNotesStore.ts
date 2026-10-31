import { create } from 'zustand';
import type { NoteMeta } from '../types/note';

interface NotesStore {
  notes: NoteMeta[]; // newest first
  activeId: string | null;
  setNotes: (notes: NoteMeta[]) => void;
  setActiveId: (id: string | null) => void;
  upsertNote: (note: NoteMeta) => void;
  removeNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  activeId: null,
  setNotes: (notes) => set({ notes }),
  setActiveId: (activeId) => set({ activeId }),
  // A saved note moves to the top of the list.
  upsertNote: (note) => set((state) => ({ notes: [note, ...state.notes.filter((n) => n.id !== note.id)] })),
  removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}));
