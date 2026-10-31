import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

// Key cap, Nuno's signature detail.
const kbdVariants = cva(
  'inline-flex items-center justify-center border border-line-strong bg-surface font-mono leading-none text-ink shadow-key',
  {
    variants: {
      size: {
        sm: 'h-5 min-w-5 rounded-md px-1.5 text-[11px] text-muted',
        md: 'h-8 min-w-8 rounded-lg px-2 text-[13px]',
        lg: 'h-14 min-w-14 rounded-2xl px-4 text-[22px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export function Kbd({ className, size, ...props }: ComponentProps<'kbd'> & VariantProps<typeof kbdVariants>) {
  return <kbd className={cn(kbdVariants({ size }), className)} {...props} />;
}
