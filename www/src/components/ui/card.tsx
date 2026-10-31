import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

const cardVariants = cva('rounded-[28px] border p-6 shadow-card sm:p-7', {
  variants: {
    tone: {
      plain: 'border-line bg-surface',
      violet: 'border-violet-edge bg-violet-tint',
      sky: 'border-sky-edge bg-sky-tint',
      peach: 'border-peach-edge bg-peach-tint',
      mint: 'border-mint-edge bg-mint-tint',
    },
  },
  defaultVariants: { tone: 'plain' },
});

export type CardTone = NonNullable<VariantProps<typeof cardVariants>['tone']>;

export function Card({ className, tone, ...props }: ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ tone }), className)} {...props} />;
}
