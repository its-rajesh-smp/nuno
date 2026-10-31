import type { ReactNode } from 'react';
import { Card, type CardTone } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import type { Feature } from '../../types/content';

const LEAD_COLOUR: Record<CardTone, string> = {
  plain: 'text-ink',
  mint: 'text-mint-ink',
  peach: 'text-peach-ink',
  violet: 'text-violet-ink',
  sky: 'text-sky-ink',
};

interface FeatureCardProps {
  feature: Feature;
  visual?: ReactNode;
}

export function FeatureCard({ feature, visual }: FeatureCardProps) {
  return (
    <Card
      tone={feature.tone}
      className={cn(
        'reveal flex flex-col justify-between gap-8',
        feature.wide && 'md:col-span-2 lg:flex-row lg:items-center',
      )}
    >
      <div className={cn(feature.wide && 'lg:max-w-[46%]')}>
        <h3 className="text-[24px] leading-tight font-medium tracking-[-0.035em] text-balance">
          <span className={LEAD_COLOUR[feature.tone]}>{feature.lead}</span> {feature.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">{feature.description}</p>
      </div>
      {visual && <div className="flex justify-center lg:flex-1 lg:justify-end">{visual}</div>}
    </Card>
  );
}
