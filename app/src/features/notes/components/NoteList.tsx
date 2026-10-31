import { useState } from 'react';
import { formatNoteDate } from '@/utils/date';
import { displayTitle } from '../helpers/noteTitle';
import { useNotesStore } from '../stores/useNotesStore';
import type { NoteMeta } from '../types/note';
import { DeleteNoteDialog } from './ui/DeleteNoteDialog';
import { NoteListItem } from './ui/NoteListItem';

interface NoteListProps {
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ onOpen, onDelete }: NoteListProps) {
  const notes = useNotesStore((s) => s.notes);
  const activeId = useNotesStore((s) => s.activeId);
  const [pendingDelete, setPendingDelete] = useState<NoteMeta | null>(null);

  return (
    <nav className="flex-1 space-y-px overflow-y-auto px-2 pb-3" aria-label="Notes">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          title={displayTitle(note.title)}
          date={formatNoteDate(note.updatedAt)}
          active={note.id === activeId}
          onSelect={() => onOpen(note.id)}
          onDelete={() => setPendingDelete(note)}
        />
      ))}
      <DeleteNoteDialog
        title={pendingDelete ? displayTitle(pendingDelete.title) : null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) onDelete(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </nav>
  );
}
