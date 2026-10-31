import { app } from 'electron';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { AppState, Note, NoteDraft, NoteMeta, NoteUpdate } from '@shared/bridge';

// Notes live as plain JSON files in the app's data folder, one file per note.

const notesDir = () => path.join(app.getPath('userData'), 'notes');
const statePath = () => path.join(app.getPath('userData'), 'state.json');
const notePath = (id: string) => path.join(notesDir(), `${id}.json`);
const isValidId = (id: unknown): id is string => typeof id === 'string' && /^[a-z0-9-]+$/i.test(id);

function readJSON<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

// Write to a temp file first so a crash mid-write never corrupts a note.
function writeJSON(file: string, data: unknown) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, file);
}

const toMeta = ({ id, title, createdAt, updatedAt }: Note): NoteMeta => ({ id, title, createdAt, updatedAt });

export function listNotes(): NoteMeta[] {
  fs.mkdirSync(notesDir(), { recursive: true });
  return fs
    .readdirSync(notesDir())
    .filter((file) => file.endsWith('.json'))
    .map((file) => readJSON<Note | null>(path.join(notesDir(), file), null))
    .filter((note): note is Note => note !== null)
    .map(toMeta)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getNote(id: string): Note | null {
  return isValidId(id) ? readJSON<Note | null>(notePath(id), null) : null;
}

export function createNote({ title = '', content = '' }: NoteDraft = {}): Note {
  fs.mkdirSync(notesDir(), { recursive: true });
  const now = Date.now();
  const note: Note = { id: randomUUID(), title, content, createdAt: now, updatedAt: now };
  writeJSON(notePath(note.id), note);
  return note;
}

export function saveNote({ id, title, content }: NoteUpdate): NoteMeta | null {
  const note = getNote(id);
  if (!note) return null;
  const updated: Note = { ...note, title, content, updatedAt: Date.now() };
  writeJSON(notePath(id), updated);
  return toMeta(updated);
}

export function deleteNote(id: string) {
  if (isValidId(id)) fs.rmSync(notePath(id), { force: true });
}

export const getState = (): AppState => readJSON<AppState>(statePath(), {});

export function setState(patch: AppState) {
  writeJSON(statePath(), { ...getState(), ...patch });
}
