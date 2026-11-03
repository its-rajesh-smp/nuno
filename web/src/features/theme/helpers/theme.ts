export type Theme = 'light' | 'dark' | 'system';

// Read before React mounts (see themeScript), so it lives outside the notes app state.
export const THEME_KEY = 'zodnote:theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  } catch {
    return 'system';
  }
}

export const resolveTheme = (theme: Theme): 'light' | 'dark' =>
  theme === 'system' ? (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light') : theme;

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', resolveTheme(theme) === 'dark');
}

export function watchSystemTheme(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

// Runs in <head> before first paint so a dark-mode visit never flashes white.
export const themeScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='dark'||(t!=='light'&&matchMedia('${DARK_QUERY}').matches))document.documentElement.classList.add('dark')}catch(e){}`;
