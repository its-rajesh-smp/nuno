import { contextBridge, ipcRenderer } from 'electron';
import { MENU_EVENTS, type ZodnoteBridge } from '@shared/bridge';

const bridge: ZodnoteBridge = {
  listNotes: () => ipcRenderer.invoke('notes:list'),
  getNote: (id) => ipcRenderer.invoke('notes:get', id),
  createNote: (draft) => ipcRenderer.invoke('notes:create', draft),
  saveNote: (update) => ipcRenderer.invoke('notes:save', update),
  saveNoteSync: (update) => ipcRenderer.sendSync('notes:save-sync', update),
  deleteNote: (id) => ipcRenderer.invoke('notes:delete', id),
  getState: () => ipcRenderer.invoke('state:get'),
  setState: (patch) => ipcRenderer.invoke('state:set', patch),
  onMenu: (event, fn) => {
    if (!MENU_EVENTS.includes(event)) return () => {};
    const listener = () => fn();
    ipcRenderer.on(event, listener);
    return () => ipcRenderer.removeListener(event, listener);
  },
};

contextBridge.exposeInMainWorld('zodnote', bridge);
