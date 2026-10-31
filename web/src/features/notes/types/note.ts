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
