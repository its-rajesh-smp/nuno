import { bridge } from '@/libs/bridge';

export const deleteNote = async (id: string): Promise<void> => bridge.deleteNote(id);
