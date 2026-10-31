import type { BlockOption, BlockType } from '../types/block';

export const BLOCK_OPTIONS: BlockOption[] = [
  { type: 'p', label: 'Text', hint: 'Just start writing', icon: 'Aa', keywords: 'text paragraph plain' },
  { type: 'h1', label: 'Heading 1', hint: 'Big section heading', icon: 'H1', keywords: 'h1 heading title', shortcut: '#' },
  { type: 'h2', label: 'Heading 2', hint: 'Medium section heading', icon: 'H2', keywords: 'h2 heading subtitle', shortcut: '##' },
  { type: 'h3', label: 'Heading 3', hint: 'Small section heading', icon: 'H3', keywords: 'h3 heading', shortcut: '###' },
  { type: 'ul', label: 'Bulleted list', hint: 'A simple list', icon: '•', keywords: 'bullet list ul unordered', shortcut: '-' },
  { type: 'ol', label: 'Numbered list', hint: 'A list with numbers', icon: '1.', keywords: 'numbered list ol ordered', shortcut: '1.' },
  { type: 'todo', label: 'To-do list', hint: 'Track tasks', icon: '☐', keywords: 'todo task checkbox check', shortcut: '[]' },
  { type: 'quote', label: 'Quote', hint: 'Capture a quote', icon: '❝', keywords: 'quote blockquote', shortcut: '>' },
  { type: 'code', label: 'Code', hint: 'A code snippet', icon: '</>', keywords: 'code snippet pre', shortcut: '```' },
  { type: 'hr', label: 'Divider', hint: 'Separate sections', icon: '—', keywords: 'divider hr line separator', shortcut: '---' },
];

// Typed at the start of a paragraph and followed by a space ("---" converts on its own).
export const SHORTCUTS: Record<string, BlockType> = Object.fromEntries(
  BLOCK_OPTIONS.filter((option) => option.shortcut && option.type !== 'hr').map((option) => [option.shortcut, option.type]),
);
SHORTCUTS['*'] = 'ul';

export const filterBlockOptions = (query: string) =>
  BLOCK_OPTIONS.filter((option) => option.label.toLowerCase().includes(query) || option.keywords.includes(query));

export const PLACEHOLDERS: Partial<Record<BlockType, string>> = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  ul: 'List',
  ol: 'List',
  todo: 'To-do',
  quote: 'Quote',
  code: 'Code',
};

// Headings show their placeholder even when the caret is elsewhere.
export const ALWAYS_SHOW_PLACEHOLDER = new Set<BlockType>(['h1', 'h2', 'h3']);
