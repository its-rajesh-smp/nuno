import { bridge } from '@/libs/bridge';
import type { AppState } from '../types/note';

export const getAppState = async (): Promise<AppState> => bridge.getState();

export const setAppState = async (patch: AppState): Promise<void> => bridge.setState(patch);
