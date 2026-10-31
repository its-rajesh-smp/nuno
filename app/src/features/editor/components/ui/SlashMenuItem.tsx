import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/utils/cn';
import type { BlockOption } from '../../types/block';

interface SlashMenuItemProps {
  option: BlockOption;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export function SlashMenuItem({ option, active, onSelect, onHover }: SlashMenuItemProps) {
  return (
    <div
      role="option"
      aria-selected={active}
      data-active={active || undefined}
      onClick={onSelect}
      onMouseMove={onHover}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 select-none',
        active && 'bg-accent',
      )}
    >
      <span
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-xl border bg-surface text-sm font-semibold',
          active ? 'border-accent-edge/60' : 'border-line',
        )}
      >
        {option.icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold leading-snug text-ink">{option.label}</span>
        <span className="truncate text-[13px] leading-snug text-muted">{option.hint}</span>
      </span>
      {option.shortcut && <Kbd>{option.shortcut}</Kbd>}
    </div>
  );
}
