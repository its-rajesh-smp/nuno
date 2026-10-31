import { cn } from '@/utils/cn';
import { FACTS } from '../helpers/content';

export function FactsRow() {
  return (
    <section aria-label="Nuno in numbers" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <dl className="reveal grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {FACTS.map((fact, index) => (
          <div
            key={fact.label}
            className={cn(
              'flex flex-col items-center gap-2 px-4 py-10 text-center',
              index % 2 === 1 && 'border-l border-line',
              index >= 2 && 'border-t border-line lg:border-t-0',
              index === 2 && 'lg:border-l',
            )}
          >
            <dt className="order-2 text-[13px] font-medium text-muted">{fact.label}</dt>
            <dd className="order-1 font-mono text-[36px] leading-none sm:text-[48px]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
