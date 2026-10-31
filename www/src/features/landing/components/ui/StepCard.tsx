import type { Step } from '../../types/content';
import { StepVisual } from './StepVisual';

interface StepCardProps {
  step: Step;
  index: number;
}

export function StepCard({ step, index }: StepCardProps) {
  return (
    <div className="reveal rounded-[28px] border border-line bg-surface p-2 shadow-card">
      <div className="grid h-44 place-items-center rounded-[20px] bg-sunken">
        <StepVisual visual={step.visual} />
      </div>
      <div className="px-4 pt-5 pb-4">
        <p className="font-mono text-[13px] text-accent-edge">{String(index).padStart(2, '0')}</p>
        <h3 className="mt-2 text-[24px] leading-tight font-medium tracking-[-0.035em]">{step.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">{step.description}</p>
      </div>
    </div>
  );
}
