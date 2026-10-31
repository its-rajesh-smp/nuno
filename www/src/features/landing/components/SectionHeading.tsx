import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

interface SectionHeadingProps {
  badge: string;
  title: ReactNode;
  description: string;
}

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <Badge>{badge}</Badge>
      <h2 className="mt-5 text-[36px] leading-[1.1] font-medium tracking-[-0.025em] text-balance sm:text-[48px]">{title}</h2>
      <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty sm:text-[18px]">{description}</p>
    </div>
  );
}
