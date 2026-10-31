import { PanelLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoteList } from './NoteList';

interface NoteSidebarProps {
  onNewNote: () => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onHide: () => void;
}

export function NoteSidebar({ onNewNote, onOpen, onDelete, onHide }: NoteSidebarProps) {
  return (
    <>
      <div className="flex h-13 shrink-0 items-center justify-end px-3 drag-region">
        <Button variant="ghost" size="icon" className="no-drag" title="Hide sidebar (⌘\)" onClick={onHide}>
          <PanelLeft />
        </Button>
      </div>
      <div className="px-3 pb-3">
        <Button size="sm" className="w-full" onClick={onNewNote} title="New note (⌘N)">
          <Plus className="size-4" />
          New note
        </Button>
      </div>
      <NoteList onOpen={onOpen} onDelete={onDelete} />
    </>
  );
}
