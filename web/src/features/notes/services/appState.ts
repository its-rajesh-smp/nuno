import { storage } from '@/libs/storage';
import type { AppState } from '../types/note';

export const getAppState = async (): Promise<AppState> => storage.getState();

export const setAppState = async (patch: AppState): Promise<void> => storage.setState(patch);
