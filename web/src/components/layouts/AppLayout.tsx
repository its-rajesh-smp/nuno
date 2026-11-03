import { PanelLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  sidebarOpen: boolean;
  /** Desktop pushes the content aside; phones get a slide-over drawer. */
  isDesktop: boolean;
  onToggleSidebar: () => void;
}

export function AppLayout({ sidebar, children, sidebarOpen, isDesktop, onToggleSidebar }: AppLayoutProps) {
  return (
    <div className="flex h-full">
      <aside
        className={cn(
          'flex w-64 shrink-0 flex-col border-r border-line bg-canvas duration-200 ease-out',
          isDesktop
            ? cn('transition-[margin]', !sidebarOpen && '-ml-64')
            : cn('fixed inset-y-0 left-0 z-40 transition-[translate,box-shadow]', sidebarOpen ? 'shadow-float' : '-translate-x-full'),
        )}
        inert={!sidebarOpen}
      >
        {sidebar}
      </aside>
      {!isDesktop && sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onToggleSidebar}
          className="fixed inset-0 z-30 cursor-default bg-stone-900/20 backdrop-blur-[2px] dark:bg-black/60"
        />
      )}
      <main className="flex min-w-0 flex-1 flex-col bg-surface">
        <div className="flex h-13 shrink-0 items-center px-3">
          {!sidebarOpen && (
            <Button variant="ghost" size="icon" title="Show sidebar (⌘\)" onClick={onToggleSidebar}>
              <PanelLeft />
            </Button>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
