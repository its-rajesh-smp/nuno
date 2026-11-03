import { User } from 'lucide-react';
import { cn } from '@/utils/cn';

// The user's photo when they have one, otherwise the same person glyph a guest gets.
export function AccountAvatar({ imageUrl, className }: { imageUrl?: string | null; className?: string }) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-sunken text-muted',
        className,
      )}
    >
      {imageUrl ? <img src={imageUrl} alt="" className="size-full object-cover" /> : <User className="size-4" />}
    </span>
  );
}
