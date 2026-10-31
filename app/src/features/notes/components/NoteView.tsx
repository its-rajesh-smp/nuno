import { Spinner } from '@/components/ui/Spinner';
import { useNote } from '../hooks/useNote';
import { useNotesStore } from '../stores/useNotesStore';
import { NoteDocument } from './NoteDocument';
import { NoteMessage } from './ui/NoteMessage';

export function NoteView() {
  const activeId = useNotesStore((s) => s.activeId);
  const { note, loading, error } = useNote(activeId);

  if (error) return <NoteMessage title="Couldn't open this note" message={error} />;
  if (loading || !note) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner />
      </div>
    );
  }
  return <NoteDocument key={note.id} note={note} />;
}
