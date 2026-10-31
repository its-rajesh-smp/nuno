import { cn } from '@/utils/cn';

interface MockNoteItemProps {
  title: string;
  time: string;
  active?: boolean;
}

export function MockNoteItem({ title, time, active }: MockNoteItemProps) {
  return (
    <div className={cn('rounded-xl px-3 py-2', active && 'bg-accent')}>
      <p className="truncate text-[13px] leading-snug font-semibold text-ink">{title}</p>
      <p className="font-mono text-[11px] leading-snug text-subtle">{time}</p>
    </div>
  );
}
