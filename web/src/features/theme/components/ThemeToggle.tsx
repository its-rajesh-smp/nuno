import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '../stores/useThemeStore';

export function ThemeToggle() {
  const resolved = useThemeStore((s) => s.resolved);
  const setTheme = useThemeStore((s) => s.setTheme);
  const isDark = resolved === 'dark';
  const label = isDark ? 'Light mode' : 'Dark mode';

  return (
    <Button variant="ghost" size="icon" title={label} aria-label={label} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
