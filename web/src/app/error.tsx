'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error }: { error: unknown }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-[36px] font-normal tracking-[-0.035em]">Something went wrong</h1>
      <p className="max-w-md text-[15px] text-muted text-pretty">{message}</p>
      <p className="text-[13px] text-subtle">Your notes are safe in this browser.</p>
      <Button className="mt-3" onClick={() => window.location.reload()}>
        Reload Zodnote
      </Button>
    </div>
  );
}
