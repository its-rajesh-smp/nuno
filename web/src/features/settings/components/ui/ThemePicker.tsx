import { Monitor, Moon, Sun } from 'lucide-react';
import type { Theme } from '@/features/theme/helpers/theme';
import { cn } from '@/utils/cn';

const options = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
] satisfies { value: Theme; label: string; icon: typeof Sun }[];

export function ThemePicker({ value, onChange }: { value: Theme; onChange: (theme: Theme) => void }) {
  return (
    <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-1 rounded-full bg-sunken p-1">
      {options.map(({ value: option, label, icon: Icon }) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            'flex h-8 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-edge',
            value === option ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink',
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
