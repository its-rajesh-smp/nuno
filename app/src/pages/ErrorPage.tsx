import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import { Button } from '@/components/ui/button';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center drag-region">
      <h1 className="text-[36px] font-normal tracking-[-0.035em]">Something went wrong</h1>
      <p className="max-w-md text-[15px] text-muted text-pretty">{message}</p>
      <p className="text-[13px] text-subtle">Your notes are safe on disk.</p>
      <Button className="no-drag mt-3" onClick={() => navigate(0)}>
        Reload Nuno
      </Button>
    </div>
  );
}
