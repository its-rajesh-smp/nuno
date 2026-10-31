import { SiteFooter } from '@/components/layouts/SiteFooter';
import { SiteNav } from '@/components/layouts/SiteNav';
import { ClosingCta } from '@/features/landing/components/ClosingCta';
import { FactsRow } from '@/features/landing/components/FactsRow';
import { Faq } from '@/features/landing/components/Faq';
import { FeatureBento } from '@/features/landing/components/FeatureBento';
import { Hero } from '@/features/landing/components/Hero';
import { HowItWorks } from '@/features/landing/components/HowItWorks';

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <FeatureBento />
        <HowItWorks />
        <FactsRow />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
