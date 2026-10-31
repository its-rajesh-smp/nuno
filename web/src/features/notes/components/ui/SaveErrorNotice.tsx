import { TriangleAlert } from 'lucide-react';

export function SaveErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-danger shadow-float animate-pop-in"
    >
      <TriangleAlert className="size-4" />
      {message}
    </div>
  );
}
