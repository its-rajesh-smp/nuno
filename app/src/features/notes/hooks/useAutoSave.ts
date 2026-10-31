import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '@/utils/error';
import { saveNote, saveNoteSync } from '../services/saveNote';
import { useNotesStore } from '../stores/useNotesStore';
import type { NoteUpdate } from '../types/note';

const SAVE_DELAY_MS = 400;

// Debounced saving. The latest content is kept in a ref, so switching notes or
// closing the window can always flush it, even after the editor DOM is gone.
export function useAutoSave() {
  const pending = useRef<NoteUpdate | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [error, setError] = useState<string | null>(null);

  const flush = useCallback(async () => {
    clearTimeout(timer.current);
    const update = pending.current;
    if (!update) return;
    pending.current = null;
    try {
      const meta = await saveNote(update);
      if (meta) useNotesStore.getState().upsertNote(meta);
      setError(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Could not save your changes.'));
    }
  }, []);

  const queue = useCallback(
    (update: NoteUpdate) => {
      pending.current = update;
      clearTimeout(timer.current);
      timer.current = setTimeout(flush, SAVE_DELAY_MS);
    },
    [flush],
  );

  useEffect(() => {
    const saveBeforeClose = () => {
      if (pending.current) saveNoteSync(pending.current);
      pending.current = null;
    };
    window.addEventListener('beforeunload', saveBeforeClose);
    return () => {
      window.removeEventListener('beforeunload', saveBeforeClose);
      flush();
    };
  }, [flush]);

  return { queue, flush, error };
}
