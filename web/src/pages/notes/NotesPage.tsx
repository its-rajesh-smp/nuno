import { useCallback } from 'react';
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
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useShortcut } from '@/hooks/useShortcut';

export function NotesPage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { loading, error, retry } = useNotes();
  const { openNote, addNote, removeNote, error: actionError } = useNoteActions();
  const sidebar = useSidebar(isDesktop);
  const { closeDrawer } = sidebar;

  // On phones the drawer gets out of the way once you pick or create a note.
  const handleOpen = useCallback(
    (id: string) => {
      openNote(id);
      closeDrawer();
    },
    [openNote, closeDrawer],
  );
  const handleNew = useCallback(() => {
    addNote();
    closeDrawer();
  }, [addNote, closeDrawer]);

  // Browsers reserve ⌘N for a new window, so the web uses ⌥⌘N.
  useShortcut({ code: 'KeyN', mod: true, alt: true }, handleNew);
  useShortcut({ code: 'Backslash', mod: true }, sidebar.toggle);

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
      isDesktop={isDesktop}
      sidebarOpen={sidebar.open}
      onToggleSidebar={sidebar.toggle}
      sidebar={<NoteSidebar onNewNote={handleNew} onOpen={handleOpen} onDelete={removeNote} onHide={sidebar.toggle} />}
    >
      <NoteView />
      {actionError && <SaveErrorNotice message={actionError} />}
    </AppLayout>
  );
}
