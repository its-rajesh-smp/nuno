import { useCallback, useRef, useState } from 'react';
import { textBeforeCaret } from '../helpers/caret';
import { filterBlockOptions } from '../helpers/blockOptions';
import { getBlockType, getCurrentBlock } from '../helpers/dom';
import type { SlashMenuState } from '../types/block';

const CLOSED: SlashMenuState = { open: false, query: '', index: 0, options: [], block: null };

// "/" followed by up to 24 word characters, at the start of a line or after a space.
const SLASH_PATTERN = /(?:^|\s)\/([\w ]{0,24})$/;

export function useSlashMenu() {
  const [menu, setMenuState] = useState<SlashMenuState>(CLOSED);
  // Native DOM listeners read the latest state through this ref.
  const menuRef = useRef(menu);

  const setMenu = useCallback((next: SlashMenuState) => {
    menuRef.current = next;
    setMenuState(next);
  }, []);

  const close = useCallback(() => {
    if (menuRef.current.open) setMenu(CLOSED);
  }, [setMenu]);

  const sync = useCallback(
    (root: HTMLElement) => {
      const sel = window.getSelection();
      const block = getCurrentBlock(root);
      if (!sel?.isCollapsed || !block || getBlockType(block) === 'code') return close();
      const match = textBeforeCaret(block).match(SLASH_PATTERN);
      if (!match || match[1].startsWith(' ')) return close();
      const query = match[1].toLowerCase();
      const options = filterBlockOptions(query);
      if (!options.length) return close();
      const prev = menuRef.current;
      const index = prev.open && prev.query === query ? prev.index : 0;
      setMenu({ open: true, query, index, options, block });
    },
    [close, setMenu],
  );

  const move = useCallback(
    (delta: number) => {
      const prev = menuRef.current;
      const count = prev.options.length;
      setMenu({ ...prev, index: (prev.index + delta + count) % count });
    },
    [setMenu],
  );

  const highlight = useCallback(
    (index: number) => {
      if (menuRef.current.index !== index) setMenu({ ...menuRef.current, index });
    },
    [setMenu],
  );

  return { menu, menuRef, sync, move, highlight, close };
}
