import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '@/utils/error';
import { WELCOME_NOTE } from '../helpers/welcomeNote';
import { getAppState, setAppState } from '../services/appState';
import { createNote } from '../services/createNote';
import { listNotes } from '../services/listNotes';
import { useNotesStore } from '../stores/useNotesStore';
import type { NoteMeta } from '../types/note';

// Loads every note into the store and picks the one to open (the last opened, else the newest).
export function useNotes() {
  const notes = useNotesStore((s) => s.notes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes() {
      setLoading(true);
      setError(null);
      try {
        const [state, saved] = await Promise.all([getAppState(), listNotes()]);
        let list: NoteMeta[] = saved;
        if (!list.length) {
          list = [await createNote(state.welcomed ? undefined : WELCOME_NOTE)];
          await setAppState({ welcomed: true });
        }
        if (cancelled) return;
        const last = list.find((note) => note.id === state.lastOpenedId);
        const { setNotes, setActiveId } = useNotesStore.getState();
        setNotes(list);
        setActiveId((last ?? list[0]).id);
      } catch (err: unknown) {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load your notes.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadNotes();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { notes, loading, error, retry };
}
