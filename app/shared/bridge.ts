// Contract between the Electron main process and the renderer.

export interface NoteMeta {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface Note extends NoteMeta {
  content: string;
}

export interface NoteDraft {
  title?: string;
  content?: string;
}

export interface NoteUpdate {
  id: string;
  title: string;
  content: string;
}

export interface AppState {
  lastOpenedId?: string;
  sidebarHidden?: boolean;
  welcomed?: boolean;
}

export type MenuEvent = 'menu:new-note' | 'menu:toggle-sidebar';

export const MENU_EVENTS: MenuEvent[] = ['menu:new-note', 'menu:toggle-sidebar'];

export interface NunoBridge {
  listNotes: () => Promise<NoteMeta[]>;
  getNote: (id: string) => Promise<Note | null>;
  createNote: (draft?: NoteDraft) => Promise<Note>;
  saveNote: (update: NoteUpdate) => Promise<NoteMeta | null>;
  saveNoteSync: (update: NoteUpdate) => NoteMeta | null;
  deleteNote: (id: string) => Promise<void>;
  getState: () => Promise<AppState>;
  setState: (patch: AppState) => Promise<void>;
  onMenu: (event: MenuEvent, fn: () => void) => () => void;
}
