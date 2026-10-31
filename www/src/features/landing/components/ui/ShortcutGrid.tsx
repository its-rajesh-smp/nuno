import { Kbd } from '@/components/ui/kbd';
import { SHORTCUTS } from '../../helpers/content';

export function ShortcutGrid() {
  return (
    <div className="grid w-full max-w-[320px] grid-cols-3 gap-2">
      {SHORTCUTS.map((shortcut) => (
        <div key={shortcut.keys} className="flex flex-col items-center gap-2 rounded-2xl bg-surface px-2 py-3 shadow-card">
          <Kbd>{shortcut.keys}</Kbd>
          <span className="text-[12px] font-semibold text-muted">{shortcut.label}</span>
        </div>
      ))}
    </div>
  );
}
