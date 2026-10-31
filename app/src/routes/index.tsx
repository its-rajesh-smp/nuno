import { createHashRouter } from 'react-router';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotesPage } from '@/pages/notes/NotesPage';

// Hash routing, because the app is loaded from a file:// URL.
export const router = createHashRouter([
  {
    path: '/',
    element: <NotesPage />,
    errorElement: <ErrorPage />,
  },
]);
