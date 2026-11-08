import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { AccountSummary } from '@/features/account/components/ui/AccountSummary';
import { useAccount } from '@/features/account/hooks/useAccount';
import { authRoutes } from '@/features/auth/helpers/authRoutes';
import { useThemeStore } from '@/features/theme/stores/useThemeStore';
import { SettingsSection } from './ui/SettingsSection';
import { ShortcutRow } from './ui/ShortcutRow';
import { ThemePicker } from './ui/ThemePicker';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const { account, signOut } = useAccount();

  const handleSignOut = () => {
    onOpenChange(false);
    signOut();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-7">
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription className="sr-only">Appearance, account and keyboard shortcuts.</DialogDescription>

        <div className="mt-6">
          <SettingsSection title="Appearance">
            <ThemePicker value={theme} onChange={setTheme} />
          </SettingsSection>

          <SettingsSection title="Account">
            <div className="flex items-center gap-3">
              <AccountSummary account={account} />
              {account ? (
                <Button variant="secondary" size="sm" onClick={handleSignOut}>
                  Sign out
                </Button>
              ) : (
                <Button variant="secondary" size="sm" asChild>
                  <Link href={authRoutes.signIn}>Sign in</Link>
                </Button>
              )}
            </div>
          </SettingsSection>

          <SettingsSection title="Shortcuts">
            <ShortcutRow label="New note" keys={['⌥', '⌘', 'N']} />
            <ShortcutRow label="Show or hide sidebar" keys={['⌘', '\\']} />
            <ShortcutRow label="Insert a block" keys={['/']} />
          </SettingsSection>
        </div>
      </DialogContent>
    </Dialog>
  );
}
