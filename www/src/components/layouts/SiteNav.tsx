'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/features/landing/helpers/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { site } from '@/libs/site';
import { cn } from '@/utils/cn';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function SiteNav() {
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border border-line bg-surface/75 pr-2 pl-5 backdrop-blur-xl transition-shadow',
          scrolled ? 'shadow-float' : 'shadow-card',
        )}
      >
        <a href="#top" className="flex items-center" aria-label="Zodnote home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  'flex h-9 items-center rounded-full px-3.5 text-[13px] font-semibold transition-colors',
                  active === link.id ? 'bg-accent text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="sm">
          <a href={site.downloadUrl}>
            <Download className="group-hover:translate-y-0.5" />
            Download
          </a>
        </Button>
      </nav>
    </header>
  );
}
