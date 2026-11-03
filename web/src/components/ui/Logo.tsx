import { cn } from '@/utils/cn';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('size-7', className)}>
      {/* A note page on a butter-yellow tile. Fixed colours: the mark looks the same in dark mode. */}
      <rect width="64" height="64" rx="14.4" className="fill-yellow-300" />
      <path d="M19 14h18l10 10v24a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3V17a3 3 0 0 1 3-3z" className="fill-white" />
      <path d="M37 14v7a3 3 0 0 0 3 3h7z" className="fill-yellow-200" />
      <rect x="21" y="30" width="20" height="3.2" rx="1.6" className="fill-stone-900" />
      <rect x="21" y="37" width="20" height="3.2" rx="1.6" className="fill-stone-900" />
      <rect x="21" y="44" width="12" height="3.2" rx="1.6" className="fill-stone-900" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <LogoMark />
      <span className="text-[17px] leading-none font-semibold tracking-[-0.02em]">Zodnote</span>
    </span>
  );
}
