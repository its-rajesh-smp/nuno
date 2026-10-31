import { ALWAYS_SHOW_PLACEHOLDER, PLACEHOLDERS } from './blockOptions';
import { allBlocks, getBlockType, getCurrentBlock, isEmpty } from './dom';

const SLASH_HINT = "Type '/' for commands";

function placeholderFor(root: HTMLElement, block: HTMLElement, current: HTMLElement | null) {
  const type = getBlockType(block);
  if (type !== 'p') return ALWAYS_SHOW_PLACEHOLDER.has(type) || block === current ? PLACEHOLDERS[type] : undefined;
  if (block === current && document.activeElement === root) return SLASH_HINT;
  const onlyBlock = root.children.length === 1 && root.firstElementChild === block;
  return onlyBlock ? 'Start writing…' : undefined;
}

export function updatePlaceholders(root: HTMLElement) {
  const current = getCurrentBlock(root);
  allBlocks(root).forEach((block) => {
    const text = isEmpty(block) ? placeholderFor(root, block, current) : undefined;
    if (text) block.dataset.ph = text;
    else block.removeAttribute('data-ph');
  });
}
