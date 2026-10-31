import { useEffect, useRef } from 'react';

interface Shortcut {
  /** KeyboardEvent.code, e.g. 'KeyN' or 'Backslash' (layout- and dead-key-safe). */
  code: string;
  /** ⌘ on Mac, Ctrl elsewhere. */
  mod?: boolean;
  alt?: boolean;
}

// Runs `handler` when the shortcut is pressed anywhere on the page.
export function useShortcut({ code, mod = false, alt = false }: Shortcut, handler: () => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== code || (e.metaKey || e.ctrlKey) !== mod || e.altKey !== alt || e.shiftKey) return;
      e.preventDefault();
      handlerRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [code, mod, alt]);
}
