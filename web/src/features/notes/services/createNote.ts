import { storage } from '@/libs/storage';
import type { Note, NoteDraft } from '../types/note';

export const createNote = async (draft?: NoteDraft): Promise<Note> => storage.createNote(draft);
