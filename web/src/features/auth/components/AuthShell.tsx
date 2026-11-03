import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/ui/Logo';
import { AuthArtPanel } from './AuthArtPanel';

// Full-page split: artwork on the left, the form on the right.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-full lg:grid-cols-[1.4fr_1fr]">
      <AuthArtPanel />
      {/* Never scrolls: the back link gets its own row and the form centres in what's left. */}
      <main className="flex h-full flex-col overflow-hidden bg-canvas">
        <Link
          href="/"
          className="mt-5 ml-5 flex shrink-0 self-start items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold text-muted outline-none hover:bg-sunken hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-edge"
        >
          <ArrowLeft className="size-4" />
          Back to notes
        </Link>
        <div className="mx-auto flex min-h-0 w-full max-w-[440px] flex-1 flex-col items-center justify-center px-5 pb-5">
          <Logo className="mb-8 self-center lg:hidden" />
          {children}
        </div>
      </main>
    </div>
  );
}
