import { cn } from '@/utils/cn';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('size-7', className)}>
      <rect width="64" height="64" rx="14.4" className="fill-ink" />
      {/* A highlighted word and a text cursor. */}
      <rect x="13.2" y="28.1" width="25.6" height="7.8" rx="3.9" className="fill-accent" />
      <rect x="42.7" y="19.6" width="4.35" height="24.9" rx="2.17" className="fill-white" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <LogoMark />
      <span className="text-[17px] leading-none font-semibold tracking-[-0.02em]">Nuno</span>
    </span>
  );
}
