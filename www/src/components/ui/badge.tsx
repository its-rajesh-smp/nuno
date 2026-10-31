import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

// Pill badge that sits above section titles.
export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink shadow-card',
        className,
      )}
      {...props}
    />
  );
}
