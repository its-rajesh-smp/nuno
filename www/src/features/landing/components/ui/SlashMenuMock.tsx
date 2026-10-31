import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/utils/cn';

const OPTIONS = [
  { icon: 'H2', label: 'Heading 2', hint: 'Medium section heading', keys: '##', active: true },
  { icon: '•', label: 'Bulleted list', hint: 'A simple list', keys: '-' },
  { icon: '☐', label: 'To-do list', hint: 'Track tasks', keys: '[]' },
];

// The slash menu as it appears in the app.
export function SlashMenuMock({ className }: { className?: string }) {
  return (
    <div className={cn('w-full max-w-[300px] rounded-2xl border border-line bg-surface p-1.5 shadow-float', className)}>
      {OPTIONS.map((option) => (
        <div key={option.label} className={cn('flex items-center gap-3 rounded-xl px-2 py-1.5', option.active && 'bg-accent')}>
          <span
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-xl border bg-surface text-[13px] font-semibold',
              option.active ? 'border-accent-edge/60' : 'border-line',
            )}
          >
            {option.icon}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[13px] leading-snug font-semibold text-ink">{option.label}</span>
            <span className="truncate text-[12px] leading-snug text-muted">{option.hint}</span>
          </span>
          <Kbd size="sm">{option.keys}</Kbd>
        </div>
      ))}
    </div>
  );
}
