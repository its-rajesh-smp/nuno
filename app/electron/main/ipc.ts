import { ipcMain } from 'electron';
import { createNote, deleteNote, getNote, getState, listNotes, saveNote, setState } from './storage';

export function registerIpc() {
  ipcMain.handle('notes:list', () => listNotes());
  ipcMain.handle('notes:get', (_e, id: string) => getNote(id));
  ipcMain.handle('notes:create', (_e, draft) => createNote(draft));
  ipcMain.handle('notes:save', (_e, update) => saveNote(update));
  ipcMain.handle('notes:delete', (_e, id: string) => deleteNote(id));
  ipcMain.handle('state:get', () => getState());
  ipcMain.handle('state:set', (_e, patch) => setState(patch));
  // Used while the window is closing, so the last keystrokes are never lost.
  ipcMain.on('notes:save-sync', (e, update) => {
    e.returnValue = saveNote(update);
  });
}
