import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/Spinner';
import { NoteSidebar } from '@/features/notes/components/NoteSidebar';
import { NoteView } from '@/features/notes/components/NoteView';
import { NoteMessage } from '@/features/notes/components/ui/NoteMessage';
import { SaveErrorNotice } from '@/features/notes/components/ui/SaveErrorNotice';
import { useNoteActions } from '@/features/notes/hooks/useNoteActions';
import { useNotes } from '@/features/notes/hooks/useNotes';
import { useSidebar } from '@/features/notes/hooks/useSidebar';
import { useMenuEvent } from '@/hooks/useMenuEvent';

export function NotesPage() {
  const { loading, error, retry } = useNotes();
  const { openNote, addNote, removeNote, error: actionError } = useNoteActions();
  const sidebar = useSidebar();

  useMenuEvent('menu:new-note', addNote);
  useMenuEvent('menu:toggle-sidebar', sidebar.toggle);

  if (loading || !sidebar.ready) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full">
        <NoteMessage
          title="Couldn't load your notes"
          message={error}
          action={<Button size="sm" onClick={retry}>Try again</Button>}
        />
      </div>
    );
  }

  return (
    <AppLayout
      sidebarHidden={sidebar.hidden}
      onShowSidebar={sidebar.toggle}
      sidebar={<NoteSidebar onNewNote={addNote} onOpen={openNote} onDelete={removeNote} onHide={sidebar.toggle} />}
    >
      <NoteView />
      {actionError && <SaveErrorNotice message={actionError} />}
    </AppLayout>
  );
}
