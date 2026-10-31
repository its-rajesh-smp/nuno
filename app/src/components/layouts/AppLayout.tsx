import { PanelLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  sidebarHidden: boolean;
  onShowSidebar: () => void;
}

// Sidebar + content, with a draggable title area under the macOS traffic lights.
export function AppLayout({ sidebar, children, sidebarHidden, onShowSidebar }: AppLayoutProps) {
  return (
    <div className="flex h-full">
      <aside
        className={cn(
          'flex w-64 shrink-0 flex-col border-r border-line bg-canvas transition-[margin] duration-200 ease-out',
          sidebarHidden && '-ml-64',
        )}
        inert={sidebarHidden}
      >
        {sidebar}
      </aside>
      <main className="flex min-w-0 flex-1 flex-col bg-surface">
        <div className={cn('flex h-13 shrink-0 items-center px-3 drag-region', sidebarHidden && 'pl-[84px]')}>
          {sidebarHidden && (
            <Button variant="ghost" size="icon" className="no-drag" title="Show sidebar (⌘\)" onClick={onShowSidebar}>
              <PanelLeft />
            </Button>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
