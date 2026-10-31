import { storage } from '@/libs/storage';

export const deleteNote = async (id: string): Promise<void> => storage.deleteNote(id);
