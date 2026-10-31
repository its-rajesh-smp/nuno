import type { CardTone } from '@/components/ui/card';

export interface NavLink {
  id: string;
  label: string;
}

export interface Feature {
  title: string;
  /** Leading words of the title, shown in the card's pastel ink colour. */
  lead: string;
  description: string;
  tone: CardTone;
  wide?: boolean;
  visual?: 'slash-menu' | 'shortcuts';
}

export interface Step {
  title: string;
  description: string;
  visual: 'open' | 'slash' | 'saved';
}

export interface Fact {
  value: string;
  label: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Shortcut {
  keys: string;
  label: string;
}
