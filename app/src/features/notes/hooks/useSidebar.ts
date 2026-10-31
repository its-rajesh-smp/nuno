import { useCallback, useEffect, useState } from 'react';
import { getAppState, setAppState } from '../services/appState';

// Sidebar visibility, remembered between launches.
// `ready` stays false until the saved value is known, so the layout can wait for it
// instead of rendering a default and visibly sliding to the saved state.
export function useSidebar() {
  const [hidden, setHidden] = useState<boolean | null>(null);

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
    setHidden((prev) => {
      const next = !prev;
      setAppState({ sidebarHidden: next }).catch(() => undefined);
      return next;
    });
  }, []);

  return { hidden: hidden ?? false, ready: hidden !== null, toggle };
}
