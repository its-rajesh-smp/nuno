export function textBeforeCaret(block: HTMLElement): string {
  const sel = window.getSelection();
  if (!sel?.rangeCount) return '';
  const range = sel.getRangeAt(0);
  const before = document.createRange();
  before.selectNodeContents(block);
  before.setEnd(range.startContainer, range.startOffset);
  return before.toString();
}

export const caretOffset = (block: HTMLElement) => textBeforeCaret(block).length;

// Place the caret `offset` characters into `node` (Infinity = the end).
export function setCaret(node: HTMLElement, offset = 0) {
  const range = document.createRange();
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let remaining = offset;
  let placed = false;
  for (let text = walker.nextNode() as Text | null; text; text = walker.nextNode() as Text | null) {
    if (remaining <= text.length) {
      range.setStart(text, remaining);
      placed = true;
      break;
    }
    remaining -= text.length;
  }
  if (!placed) {
    range.selectNodeContents(node);
    range.collapse(offset === 0);
  }
  range.collapse(true);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

// Where the caret is on screen, falling back to its block for empty lines.
export function getCaretRect(fallback: HTMLElement | null): DOMRect {
  const sel = window.getSelection();
  const rect = sel?.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : null;
  if (rect && rect.height) return rect;
  return fallback?.getBoundingClientRect() ?? new DOMRect();
}
