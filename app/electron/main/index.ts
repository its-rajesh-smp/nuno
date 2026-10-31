import { app, BrowserWindow } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { registerIpc } from './ipc';
import { buildMenu } from './menu';
import { createMainWindow } from './window';

let win: BrowserWindow | null = null;

// The packaged app gets build/icon.icns; in dev, Electron would show its own icon.
// Resolved from out/main, and never allowed to block startup.
function setDevDockIcon() {
  const icon = path.join(__dirname, '../../build/icon.png');
  if (!app.isPackaged && fs.existsSync(icon)) app.dock?.setIcon(icon);
}

function openWindow() {
  win = createMainWindow();
  win.on('closed', () => {
    win = null;
  });
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(() => {
    setDevDockIcon();
    registerIpc();
    buildMenu();
    openWindow();
  });

  app.on('activate', () => {
    if (!win) openWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
