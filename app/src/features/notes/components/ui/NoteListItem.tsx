import { Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface NoteListItemProps {
  title: string;
  date: string;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function NoteListItem({ title, date, active, onSelect, onDelete }: NoteListItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-current={active || undefined}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={cn(
        'group relative cursor-default rounded-xl py-2 pr-9 pl-3 outline-none select-none focus-visible:ring-2 focus-visible:ring-accent-edge',
        active ? 'bg-accent' : 'hover:bg-sunken',
      )}
    >
      <div className="truncate text-sm leading-snug font-semibold text-ink">{title}</div>
      <div className="font-mono text-[11px] leading-snug text-subtle">{date}</div>
      <button
        type="button"
        title="Delete note"
        aria-label={`Delete ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-subtle opacity-0 transition-opacity group-hover:opacity-100 hover:bg-surface hover:text-danger focus-visible:opacity-100"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}
