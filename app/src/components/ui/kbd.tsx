import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

// Key cap, Zodnote's signature detail for shortcuts.
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line-strong bg-surface px-1.5 font-mono text-[11px] leading-none text-muted shadow-key',
        className,
      )}
      {...props}
    />
  );
}
