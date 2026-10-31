import { storage } from '@/libs/storage';
import type { NoteMeta, NoteUpdate } from '../types/note';

export const saveNote = async (update: NoteUpdate): Promise<NoteMeta | null> => storage.saveNote(update);

// Blocking save for when the tab is closing and async work may not finish.
export const saveNoteSync = (update: NoteUpdate): NoteMeta | null => storage.saveNoteSync(update);
