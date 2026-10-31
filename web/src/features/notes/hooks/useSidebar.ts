import { useCallback, useEffect, useState } from 'react';
import { getAppState, setAppState } from '../services/appState';

// Desktop: a sidebar you can hide, remembered between visits.
// Phone: a slide-over drawer that starts closed and isn't remembered.
// `ready` stays false until the saved value is known, so the layout can wait for it
// instead of rendering a default and visibly sliding to the saved state.
export function useSidebar(isDesktop: boolean) {
  const [hidden, setHidden] = useState<boolean | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function restore() {
      try {
        const state = await getAppState();
        setHidden(!!state.sidebarHidden);
      } catch {
        setHidden(false); // fall back to showing it
      }
    }
    restore();
  }, []);

  const toggle = useCallback(() => {
    if (!isDesktop) return setDrawerOpen((open) => !open);
    setHidden((prev) => {
      const next = !prev;
      setAppState({ sidebarHidden: next }).catch(() => undefined);
      return next;
    });
  }, [isDesktop]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return {
    open: isDesktop ? hidden === false : drawerOpen,
    ready: hidden !== null,
    toggle,
    closeDrawer,
  };
}
