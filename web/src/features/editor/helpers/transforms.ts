import type { BlockType } from '../types/block';
import { caretOffset, setCaret } from './caret';
import { el, emptyParagraph, ensureContent, getBlockType, isEmpty, makeBlock, topLevel } from './dom';

// Take an li out of its list and put `replacement` in its place at the top level.
function liftOut(li: HTMLElement, replacement: HTMLElement) {
  const list = li.parentElement as HTMLElement;
  const rest: Node[] = [];
  for (let node = li.nextSibling; node; node = node.nextSibling) rest.push(node);
  list.after(replacement);
  if (rest.length) {
    const tail = document.createElement(list.tagName);
    tail.append(...rest);
    replacement.after(tail);
  }
  li.remove();
  if (!list.children.length) list.remove();
}

// Join a list with same-type neighbours so consecutive items stay one list.
function mergeLists(list: HTMLElement) {
  let target = list;
  const prev = list.previousElementSibling;
  if (prev?.tagName === list.tagName) {
    prev.append(...list.childNodes);
    list.remove();
    target = prev as HTMLElement;
  }
  const next = target.nextElementSibling;
  if (next?.tagName === target.tagName) {
    target.append(...next.childNodes);
    next.remove();
  }
}

function replaceBlock(block: HTMLElement, replacement: HTMLElement) {
  if (block.tagName === 'LI') liftOut(block, replacement);
  else block.replaceWith(replacement);
}

export function setBlockType(block: HTMLElement, type: BlockType): HTMLElement {
  if (getBlockType(block) === type) return block;
  const inner = makeBlock(type);
  inner.append(...block.childNodes);
  ensureContent(inner);
  if (type !== 'ul' && type !== 'ol') {
    replaceBlock(block, inner);
    return inner;
  }
  const list = el(type);
  list.append(inner);
  replaceBlock(block, list);
  mergeLists(list);
  return inner;
}

export function insertDivider(block: HTMLElement) {
  const hr = el('hr');
  if (isEmpty(block)) replaceBlock(block, hr);
  else topLevel(block).after(hr);
  let next = hr.nextElementSibling as HTMLElement | null;
  if (!next || next.tagName !== 'P' || !isEmpty(next)) {
    next = emptyParagraph();
    hr.after(next);
  }
  setCaret(next, 0);
}

// Enter inside a block: the text after the caret moves into a new block below.
export function splitBlock(block: HTMLElement, newType: BlockType) {
  const sel = window.getSelection();
  if (!sel?.rangeCount) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const next = makeBlock(newType);

  // At the very start, just push an empty block above; the caret stays put.
  if (caretOffset(block) === 0 && !isEmpty(block)) {
    next.append(el('br'));
    block.before(next);
    return;
  }

  const tail = document.createRange();
  tail.setStart(range.startContainer, range.startOffset);
  tail.setEnd(block, block.childNodes.length);
  next.append(tail.extractContents());
  ensureContent(block);
  ensureContent(next);
  block.after(next);
  setCaret(next, 0);
}

// Convert a block in place, keeping the caret at the same text position.
export function convertAtCaret(block: HTMLElement, type: BlockType) {
  if (type === 'hr') return insertDivider(block);
  const offset = caretOffset(block);
  setCaret(setBlockType(block, type), offset);
}
