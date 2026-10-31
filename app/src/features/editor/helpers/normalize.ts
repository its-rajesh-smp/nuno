import { BLOCK_TAGS, el, emptyParagraph } from './dom';
import { setCaret } from './caret';

// Keep the editor made only of blocks: browsers sometimes type straight into the root.
export function normalizeEditor(root: HTMLElement) {
  const sel = window.getSelection();
  const anchor = sel?.rangeCount ? { node: sel.anchorNode, offset: sel.anchorOffset } : null;
  let wrapper: HTMLElement | null = null;
  let moved = false;

  [...root.childNodes].forEach((node) => {
    if (node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName)) {
      wrapper = null;
      return;
    }
    const blank = node.nodeType === Node.COMMENT_NODE || (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim());
    if (blank && !wrapper && !(anchor?.node && node.contains(anchor.node))) {
      node.remove();
      return;
    }
    if (!wrapper) {
      wrapper = el('p');
      node.before(wrapper);
    }
    wrapper.append(node);
    moved = true;
  });

  root.querySelectorAll('[style]').forEach((node) => node.removeAttribute('style'));

  if (!root.firstElementChild) {
    const p = emptyParagraph();
    root.replaceChildren(p);
    if (document.activeElement === root) setCaret(p, 0);
  } else if (moved && anchor?.node?.isConnected) {
    const range = document.createRange();
    range.setStart(anchor.node, anchor.offset);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}
