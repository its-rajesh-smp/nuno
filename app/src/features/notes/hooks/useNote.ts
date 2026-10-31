import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/utils/error';
import { getNote } from '../services/getNote';
import type { Note } from '../types/note';

export function useNote(id: string | null) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchNote(noteId: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await getNote(noteId);
        if (!cancelled) setNote(data);
      } catch (err: unknown) {
        if (cancelled) return;
        setNote(null);
        setError(getErrorMessage(err, 'Could not open this note.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNote(id);
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Never hand back the previous note while the next one loads.
  const current = note && note.id === id ? note : null;
  return { note: current, loading: loading || (!!id && !current && !error), error };
}
