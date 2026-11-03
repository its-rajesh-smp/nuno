'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/Spinner';

// Notes live in localStorage and the layout reads the viewport on first render,
// so the app only renders in the browser.
const NotesPage = dynamic(() => import('./NotesPage').then((m) => m.NotesPage), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <Spinner />
    </div>
  ),
});

export function NotesApp() {
  return <NotesPage />;
}
