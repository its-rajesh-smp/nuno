import { createBrowserRouter } from 'react-router';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotesPage } from '@/pages/notes/NotesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NotesPage />,
    errorElement: <ErrorPage />,
  },
]);
