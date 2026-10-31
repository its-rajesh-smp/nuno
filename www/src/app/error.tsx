'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-[36px] font-normal tracking-[-0.035em]">Something went wrong</h1>
      <p className="max-w-md text-[15px] text-muted text-pretty">{message}</p>
      <Button onClick={() => retry()}>Try again</Button>
    </main>
  );
}
