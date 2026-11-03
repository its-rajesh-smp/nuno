import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

export function MenuItem({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-ink outline-none hover:bg-sunken focus-visible:bg-sunken [&_svg]:size-4 [&_svg]:text-muted',
        className,
      )}
      {...props}
    />
  );
}
