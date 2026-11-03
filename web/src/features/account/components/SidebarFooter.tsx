import { Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SettingsDialog } from '@/features/settings/components/SettingsDialog';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { AccountMenu } from './AccountMenu';

export function SidebarFooter() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-15 shrink-0 items-center justify-between gap-2 border-t border-line pr-3 pl-2">
      <AccountMenu />
      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <Button variant="ghost" size="icon" title="Settings" aria-label="Settings" onClick={() => setSettingsOpen(true)}>
          <Settings />
        </Button>
      </div>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
