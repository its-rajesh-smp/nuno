import type { ReactNode } from 'react';

interface NoteMessageProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export function NoteMessage({ title, message, action }: NoteMessageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <h2 className="text-[24px] font-medium tracking-[-0.03em] text-balance">{title}</h2>
      <p className="max-w-sm text-[15px] text-muted text-pretty">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
