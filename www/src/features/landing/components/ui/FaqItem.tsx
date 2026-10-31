import { Plus } from 'lucide-react';
import type { FaqEntry } from '../../types/content';

// Native <details>, so it works without JavaScript.
export function FaqItem({ faq }: { faq: FaqEntry }) {
  return (
    <details className="group py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
        {faq.question}
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sunken transition-[transform,background-color] group-open:rotate-45 group-open:bg-accent">
          <Plus className="size-4" />
        </span>
      </summary>
      <p className="mt-3 pr-12 text-[15px] leading-relaxed text-muted text-pretty">{faq.answer}</p>
    </details>
  );
}
