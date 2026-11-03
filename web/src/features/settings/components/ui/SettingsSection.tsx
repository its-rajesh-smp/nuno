import type { ReactNode } from 'react';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 font-mono text-[11px] tracking-wider text-subtle uppercase">{title}</h3>
      {children}
    </section>
  );
}
