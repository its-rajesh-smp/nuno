import { CircleAlert } from 'lucide-react';

// Form-wide errors (wrong password, server down) above the fields.
export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-danger/25 bg-danger/5 px-3.5 py-3 text-[14px] text-danger">
      <CircleAlert className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
