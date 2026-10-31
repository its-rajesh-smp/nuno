import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export function MockTodo({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-[15px]">
      <span
        className={cn(
          'grid size-4 place-items-center rounded-[5px] border-[1.5px]',
          checked ? 'border-ink bg-ink text-white' : 'border-line-strong bg-surface',
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span className={cn(checked ? 'text-subtle line-through' : 'text-ink-soft')}>{label}</span>
    </div>
  );
}
