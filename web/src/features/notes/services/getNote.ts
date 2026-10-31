import { storage } from '@/libs/storage';
import type { Note } from '../types/note';

export async function getNote(id: string): Promise<Note> {
  const note = await storage.getNote(id);
  if (!note) throw new Error('This note no longer exists.');
  return note;
}
