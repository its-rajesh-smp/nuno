import { create } from 'zustand';
import { applyTheme, readTheme, resolveTheme, THEME_KEY, watchSystemTheme, type Theme } from '../helpers/theme';

interface ThemeStore {
  theme: Theme;
  /** What's on screen right now, with "system" worked out. */
  resolved: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => {
  const initial = readTheme();

  // Follow the OS while the choice is "system".
  watchSystemTheme(() => {
    const { theme } = get();
    if (theme !== 'system') return;
    applyTheme(theme);
    set({ resolved: resolveTheme(theme) });
  });

  return {
    theme: initial,
    resolved: resolveTheme(initial),
    setTheme: (theme) => {
      try {
        if (theme === 'system') localStorage.removeItem(THEME_KEY);
        else localStorage.setItem(THEME_KEY, theme);
      } catch {
        // Still switch for this visit if storage is unavailable.
      }
      applyTheme(theme);
      set({ theme, resolved: resolveTheme(theme) });
    },
  };
});
