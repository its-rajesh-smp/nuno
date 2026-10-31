import type { BlockType } from '../types/block';

export const BLOCK_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'UL', 'OL', 'BLOCKQUOTE', 'PRE', 'HR', 'DIV']);

export const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
};

export const emptyParagraph = () => {
  const p = el('p');
  p.append(el('br'));
  return p;
};

export const isList = (node: Element) => node.tagName === 'UL' || node.tagName === 'OL';

// A block is a top-level child of the editor, or an li inside a top-level list.
export function getBlock(root: HTMLElement, node: Node | null): HTMLElement | null {
  while (node && node !== root) {
    const parent = node.parentNode;
    if (parent === root) return node instanceof HTMLElement ? node : null;
    if (node instanceof HTMLLIElement && parent?.parentNode === root) return node;
    node = parent;
  }
  return null;
}

export function getCurrentBlock(root: HTMLElement) {
  const sel = window.getSelection();
  return sel?.rangeCount && root.contains(sel.anchorNode) ? getBlock(root, sel.anchorNode) : null;
}

export function getBlockType(block: HTMLElement): BlockType {
  switch (block.tagName) {
    case 'LI':
      return block.parentElement?.tagName === 'OL' ? 'ol' : 'ul';
    case 'BLOCKQUOTE':
      return 'quote';
    case 'PRE':
      return 'code';
    case 'DIV':
      return block.classList.contains('todo') ? 'todo' : 'p';
    default:
      return block.tagName.toLowerCase() as BlockType;
  }
}

export function makeBlock(type: BlockType): HTMLElement {
  switch (type) {
    case 'quote':
      return el('blockquote');
    case 'code':
      return el('pre');
    case 'todo':
      return el('div', 'todo');
    case 'ul':
    case 'ol':
      return el('li');
    default:
      return el(type);
  }
}

export const isEmpty = (block: Element) => block.tagName !== 'HR' && block.textContent?.replace(/​/g, '') === '';

export const topLevel = (block: HTMLElement) => (block.tagName === 'LI' ? (block.parentElement as HTMLElement) : block);

// Empty blocks need a <br> or the caret has nowhere to sit.
export function ensureContent(block: HTMLElement) {
  if (isEmpty(block)) block.replaceChildren(el('br'));
}

export const allBlocks = (root: HTMLElement) =>
  [...root.querySelectorAll<HTMLElement>(':scope > *, :scope > ul > li, :scope > ol > li')].filter((node) => !isList(node));
