import { bridge } from '@/libs/bridge';
import type { NoteMeta, NoteUpdate } from '../types/note';

export const saveNote = async (update: NoteUpdate): Promise<NoteMeta | null> => bridge.saveNote(update);

// Blocking save for when the window is closing and async work may not finish.
export const saveNoteSync = (update: NoteUpdate): NoteMeta | null => bridge.saveNoteSync(update);
