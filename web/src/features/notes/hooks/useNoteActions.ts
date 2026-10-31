import { useCallback, useState } from 'react';
import { getErrorMessage } from '@/utils/error';
import { setAppState } from '../services/appState';
import { createNote } from '../services/createNote';
import { deleteNote } from '../services/deleteNote';
import { useNotesStore } from '../stores/useNotesStore';

export function useNoteActions() {
  const [error, setError] = useState<string | null>(null);

  const openNote = useCallback(async (id: string) => {
    useNotesStore.getState().setActiveId(id);
    try {
      await setAppState({ lastOpenedId: id });
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Could not remember the open note.'));
    }
  }, []);

  const addNote = useCallback(async () => {
    try {
      const note = await createNote();
      useNotesStore.getState().upsertNote(note);
      await openNote(note.id);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Could not create a note.'));
    }
  }, [openNote]);

  const removeNote = useCallback(
    async (id: string) => {
      try {
        await deleteNote(id);
        const store = useNotesStore.getState();
        store.removeNote(id);
        if (store.activeId !== id) return;
        // The open note was deleted: open the next one, or start a fresh note.
        const [next] = useNotesStore.getState().notes;
        if (next) await openNote(next.id);
        else await addNote();
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Could not delete the note.'));
      }
    },
    [openNote, addNote],
  );

  return { openNote, addNote, removeNote, error };
}
