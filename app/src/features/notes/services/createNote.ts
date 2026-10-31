import { bridge } from '@/libs/bridge';
import type { Note, NoteDraft } from '../types/note';

export const createNote = async (draft?: NoteDraft): Promise<Note> => bridge.createNote(draft);
