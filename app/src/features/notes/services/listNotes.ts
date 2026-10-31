import { bridge } from '@/libs/bridge';
import type { NoteMeta } from '../types/note';

export const listNotes = async (): Promise<NoteMeta[]> => bridge.listNotes();
