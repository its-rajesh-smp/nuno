import { type ComponentProps, type ReactNode, useId } from 'react';
import { cn } from '@/utils/cn';

interface TextFieldProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
  /** Sits inside the input on the right, e.g. the show-password toggle. */
  trailing?: ReactNode;
}

export function TextField({ label, error, trailing, className, ...props }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-11 w-full rounded-xl border border-line-strong bg-surface px-3.5 text-[15px] text-ink outline-none transition-shadow placeholder:text-subtle focus:border-accent-edge focus:ring-3 focus:ring-accent-edge/25 aria-invalid:border-danger aria-invalid:focus:ring-danger/20',
            trailing && 'pr-11',
            className,
          )}
          {...props}
        />
        {trailing && <div className="absolute inset-y-0 right-1.5 flex items-center">{trailing}</div>}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
