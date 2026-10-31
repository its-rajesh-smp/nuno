import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/features/landing/helpers/content';
import { site } from '@/libs/site';

const COLUMNS = [
  { title: 'Product', links: NAV_LINKS.map((link) => ({ label: link.label, href: `#${link.id}` })) },
  { title: 'Get Nuno', links: [{ label: 'Download for Mac', href: site.downloadUrl }] },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted text-pretty">{site.description}</p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[13px] font-semibold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-muted transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          aria-hidden="true"
          className="mt-16 bg-gradient-to-b from-line-strong to-transparent bg-clip-text text-center text-[28vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none lg:text-[300px]"
        >
          nuno
        </p>
        <p className="border-t border-line py-6 text-[13px] text-subtle">© 2026 Nuno. Made for people who just want to write.</p>
      </div>
    </footer>
  );
}
