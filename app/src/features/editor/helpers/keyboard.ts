import { caretOffset, setCaret, textBeforeCaret } from './caret';
import { SHORTCUTS } from './blockOptions';
import { getBlockType, isEmpty } from './dom';
import { insertDivider, setBlockType, splitBlock } from './transforms';

// Each handler returns true when it handled the key (and the change should be saved).

export function handleEnter(block: HTMLElement): boolean {
  const type = getBlockType(block);
  if (type === 'p') return false;
  if (type === 'ul' || type === 'ol' || type === 'todo') {
    // Enter on an empty item ends the list.
    if (isEmpty(block)) {
      setCaret(setBlockType(block, 'p'), 0);
      return true;
    }
    if (type !== 'todo') return false; // the browser adds the next list item
    splitBlock(block, 'todo');
    return true;
  }
  // Headings, quotes and code continue as a plain paragraph.
  splitBlock(block, 'p');
  return true;
}

export function handleBackspaceAtStart(root: HTMLElement, block: HTMLElement, onExitTop: () => void): boolean {
  if (getBlockType(block) !== 'p') {
    setCaret(setBlockType(block, 'p'), 0);
    return true;
  }
  const prev = block.previousElementSibling;
  if (prev?.tagName === 'HR') {
    prev.remove();
    return true;
  }
  if (block !== root.firstElementChild) return false;
  if (isEmpty(block) && block.nextElementSibling) block.remove();
  onExitTop();
  return true;
}

// "# " -> heading, "- " -> list, and so on.
export function applyMarkdownShortcut(block: HTMLElement): boolean {
  const sel = window.getSelection();
  const target = SHORTCUTS[textBeforeCaret(block)];
  if (!sel?.anchorNode || getBlockType(block) !== 'p' || !target) return false;
  const prefix = document.createRange();
  prefix.selectNodeContents(block);
  prefix.setEnd(sel.anchorNode, sel.anchorOffset);
  prefix.deleteContents();
  setCaret(setBlockType(block, target), 0);
  return true;
}

export function applyDividerShortcut(block: HTMLElement): boolean {
  if (getBlockType(block) !== 'p' || block.textContent !== '---') return false;
  insertDivider(block);
  return true;
}

export const isAtBlockStart = (block: HTMLElement) => window.getSelection()?.isCollapsed && caretOffset(block) === 0;

// Paste as plain text so formatting from other apps never leaks in.
export function pastePlainText(text: string, inCode: boolean) {
  text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .forEach((line, i) => {
      if (i) document.execCommand(inCode ? 'insertLineBreak' : 'insertParagraph');
      if (line) document.execCommand('insertText', false, line);
    });
}

// Removes the "/query" text that opened the slash menu.
export function deleteSlashQuery(length: number) {
  const sel = window.getSelection();
  Array.from({ length }).forEach(() => sel?.modify('extend', 'backward', 'character'));
  document.execCommand('delete');
}
