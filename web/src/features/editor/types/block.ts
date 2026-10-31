export type BlockType = 'p' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'todo' | 'quote' | 'code' | 'hr';

export interface BlockOption {
  type: BlockType;
  label: string;
  hint: string;
  icon: string;
  keywords: string;
  /** Markdown shortcut shown as a key cap, typed at the start of a line. */
  shortcut?: string;
}

export interface SlashMenuState {
  open: boolean;
  query: string;
  index: number;
  options: BlockOption[];
  block: HTMLElement | null;
}

export interface EditorHandle {
  load: (html: string) => void;
  serialize: () => string;
  focusStart: () => void;
  focusEnd: () => void;
}
