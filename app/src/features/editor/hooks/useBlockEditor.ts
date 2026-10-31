import { useCallback, useEffect, useImperativeHandle, useRef, type Ref, type RefObject } from 'react';
import { setCaret } from '../helpers/caret';
import { emptyParagraph, getBlockType, getCurrentBlock, isList } from '../helpers/dom';
import {
  applyDividerShortcut,
  applyMarkdownShortcut,
  deleteSlashQuery,
  handleBackspaceAtStart,
  handleEnter,
  isAtBlockStart,
  pastePlainText,
} from '../helpers/keyboard';
import { normalizeEditor } from '../helpers/normalize';
import { updatePlaceholders } from '../helpers/placeholders';
import { serializeEditor } from '../helpers/serialize';
import { convertAtCaret } from '../helpers/transforms';
import type { BlockOption, EditorHandle } from '../types/block';
import { useSlashMenu } from './useSlashMenu';

interface UseBlockEditorOptions {
  rootRef: RefObject<HTMLDivElement | null>;
  handleRef?: Ref<EditorHandle>;
  onChange: () => void;
  onExitTop: () => void;
}

// Wires native editing behaviour onto a contentEditable element that React doesn't render into.
export function useBlockEditor({ rootRef, handleRef, onChange, onExitTop }: UseBlockEditorOptions) {
  const { menu, menuRef, sync, move, highlight, close } = useSlashMenu();
  const callbacks = useRef({ onChange, onExitTop });
  callbacks.current = { onChange, onExitTop };

  const changed = useCallback(() => {
    if (rootRef.current) updatePlaceholders(rootRef.current);
    callbacks.current.onChange();
  }, [rootRef]);

  const selectOption = useCallback(
    (option: BlockOption) => {
      const { block, query } = menuRef.current;
      close();
      if (!block?.isConnected) return;
      deleteSlashQuery(query.length + 1);
      convertAtCaret(block, option.type);
      changed();
    },
    [menuRef, close, changed],
  );

  useImperativeHandle(
    handleRef,
    () => ({
      load: (html) => {
        const root = rootRef.current;
        if (!root) return;
        close();
        root.innerHTML = html;
        normalizeEditor(root);
        updatePlaceholders(root);
      },
      serialize: () => (rootRef.current ? serializeEditor(rootRef.current) : ''),
      focusStart: () => {
        const root = rootRef.current;
        if (!root?.firstElementChild) return;
        root.focus();
        setCaret(root.firstElementChild as HTMLElement, 0);
        updatePlaceholders(root);
      },
      focusEnd: () => {
        const root = rootRef.current;
        if (!root) return;
        root.focus();
        if (root.lastElementChild?.tagName === 'HR') root.append(emptyParagraph());
        const last = root.lastElementChild as HTMLElement;
        setCaret(isList(last) ? (last.lastElementChild as HTMLElement) : last, Infinity);
        updatePlaceholders(root);
      },
    }),
    [rootRef, close],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    document.execCommand('defaultParagraphSeparator', false, 'p');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return;
      const current = menuRef.current;
      if (current.open) {
        const menuKeys: Record<string, () => void> = {
          ArrowDown: () => move(1),
          ArrowUp: () => move(-1),
          Enter: () => selectOption(current.options[current.index]),
          Tab: () => selectOption(current.options[current.index]),
          Escape: () => close(),
        };
        if (menuKeys[e.key]) {
          e.preventDefault();
          menuKeys[e.key]();
          return;
        }
      }

      const block = getCurrentBlock(root);
      if (!block) return;
      const plainKey = !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
      const atStart = isAtBlockStart(block);

      const handled =
        (e.key === 'Enter' && plainKey && handleEnter(block)) ||
        (e.key === 'Backspace' && atStart && handleBackspaceAtStart(root, block, callbacks.current.onExitTop)) ||
        (e.key === ' ' && applyMarkdownShortcut(block));

      if (handled) {
        e.preventDefault();
        changed();
        return;
      }
      if (e.key === 'ArrowUp' && atStart && block === root.firstElementChild) {
        e.preventDefault();
        callbacks.current.onExitTop();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (getBlockType(block) === 'code') document.execCommand('insertText', false, '  ');
      }
    };

    const onInput = () => {
      normalizeEditor(root);
      const block = getCurrentBlock(root);
      if (block) applyDividerShortcut(block);
      sync(root);
      changed();
    };

    // Clicking a to-do's checkbox toggles it.
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains('todo')) return;
      if (e.clientX - target.getBoundingClientRect().left > 26) return;
      e.preventDefault();
      target.classList.toggle('checked');
      callbacks.current.onChange();
    };

    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const block = getCurrentBlock(root);
      pastePlainText(e.clipboardData?.getData('text/plain') ?? '', block?.tagName === 'PRE');
    };

    const onBlur = () => {
      close();
      updatePlaceholders(root);
    };

    const onSelectionChange = () => {
      if (menuRef.current.open) sync(root);
      updatePlaceholders(root);
    };

    root.addEventListener('keydown', onKeyDown);
    root.addEventListener('input', onInput);
    root.addEventListener('mousedown', onMouseDown);
    root.addEventListener('paste', onPaste);
    root.addEventListener('blur', onBlur);
    document.addEventListener('selectionchange', onSelectionChange);
    window.addEventListener('resize', close);
    return () => {
      root.removeEventListener('keydown', onKeyDown);
      root.removeEventListener('input', onInput);
      root.removeEventListener('mousedown', onMouseDown);
      root.removeEventListener('paste', onPaste);
      root.removeEventListener('blur', onBlur);
      document.removeEventListener('selectionchange', onSelectionChange);
      window.removeEventListener('resize', close);
    };
  }, [rootRef, menuRef, move, sync, close, selectOption, changed]);

  return { menu, selectOption, highlight, closeMenu: close };
}
