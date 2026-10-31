import { FAQS } from '../helpers/content';
import { SectionHeading } from './SectionHeading';
import { FaqItem } from './ui/FaqItem';

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <SectionHeading badge="FAQ" title="Questions, answered" description="The short version: it's a notepad, and it's yours." />
        </div>
        <div className="reveal mx-auto mt-14 max-w-3xl divide-y divide-line rounded-[28px] border border-line bg-surface px-6 shadow-card sm:px-8">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
