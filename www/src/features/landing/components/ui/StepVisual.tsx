import { Check } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import type { Step } from '../../types/content';

export function StepVisual({ visual }: { visual: Step['visual'] }) {
  if (visual === 'open') {
    return (
      <div className="flex items-center gap-2">
        <Kbd size="lg">⌘</Kbd>
        <Kbd size="lg">N</Kbd>
      </div>
    );
  }
  if (visual === 'slash') {
    return (
      <div className="flex items-center gap-3">
        <Kbd size="lg">/</Kbd>
        <span className="rounded-full border border-accent-edge/70 bg-accent px-3 py-1 text-[13px] font-semibold">Heading 1</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[13px] font-semibold shadow-card">
      <span className="grid size-5 place-items-center rounded-full bg-mint-tint text-mint-ink">
        <Check className="size-3" strokeWidth={3} />
      </span>
      Saved to your Mac
    </div>
  );
}
