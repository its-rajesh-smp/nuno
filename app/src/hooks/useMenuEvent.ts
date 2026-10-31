import { useEffect, useRef } from 'react';
import type { MenuEvent } from '@shared/bridge';
import { bridge } from '@/libs/bridge';

// Runs `handler` when an app-menu item (e.g. File > New Note) is chosen.
export function useMenuEvent(event: MenuEvent, handler: () => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => bridge.onMenu(event, () => handlerRef.current()), [event]);
}
