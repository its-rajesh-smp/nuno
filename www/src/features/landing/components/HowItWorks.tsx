import { STEPS } from '../helpers/content';
import { SectionHeading } from './SectionHeading';
import { StepCard } from './ui/StepCard';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <SectionHeading
            badge="How it works"
            title="Three steps. The last one is optional."
            description="There is no setup, no onboarding and no tour. You already know how to use it."
          />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} step={step} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
