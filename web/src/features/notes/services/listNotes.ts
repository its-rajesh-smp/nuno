import { storage } from '@/libs/storage';
import type { NoteMeta } from '../types/note';

export const listNotes = async (): Promise<NoteMeta[]> => storage.listNotes();
