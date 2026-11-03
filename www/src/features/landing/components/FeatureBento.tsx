import { FEATURES } from '../helpers/content';
import { SectionHeading } from './SectionHeading';
import { FeatureCard } from './ui/FeatureCard';
import { ShortcutGrid } from './ui/ShortcutGrid';
import { SlashMenuMock } from './ui/SlashMenuMock';

const VISUALS = {
  'slash-menu': <SlashMenuMock className="shadow-card" />,
  shortcuts: <ShortcutGrid />,
};

export function FeatureBento() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <SectionHeading
            badge="Features"
            title="Everything you need to write. Nothing else."
            description="Zodnote does a few things and does them quietly, so the page stays yours."
          />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.lead}
              feature={feature}
              visual={feature.visual ? VISUALS[feature.visual] : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
