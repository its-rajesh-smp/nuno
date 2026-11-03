import type { Fact, FaqEntry, Feature, NavLink, Shortcut, Step } from '../types/content';

export const NAV_LINKS: NavLink[] = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'faq', label: 'FAQ' },
];

export const FEATURES: Feature[] = [
  {
    lead: 'Type /',
    title: 'for anything',
    description: 'Headings, lists, to-dos, quotes, code and dividers. One key opens them all.',
    tone: 'plain',
    wide: true,
    visual: 'slash-menu',
  },
  {
    lead: 'No login.',
    title: 'Ever.',
    description: 'Open the app and start typing. There is no account to make.',
    tone: 'mint',
  },
  {
    lead: 'Stays',
    title: 'on your Mac',
    description: 'Notes are plain files on your disk. Nothing is uploaded, anywhere.',
    tone: 'peach',
  },
  {
    lead: 'Saves',
    title: 'as you type',
    description: 'There is no save button. Close the window mid-sentence and it is still there.',
    tone: 'violet',
  },
  {
    lead: 'Right where',
    title: 'you left off',
    description: 'Your last note is open and ready the moment Zodnote starts.',
    tone: 'plain',
  },
  {
    lead: 'Markdown,',
    title: 'if you like',
    description: 'Type a shortcut and a space at the start of a line. Your hands never leave the keys.',
    tone: 'sky',
    wide: true,
    visual: 'shortcuts',
  },
];

export const SHORTCUTS: Shortcut[] = [
  { keys: '#', label: 'Heading' },
  { keys: '-', label: 'List' },
  { keys: '1.', label: 'Numbers' },
  { keys: '[]', label: 'To-do' },
  { keys: '>', label: 'Quote' },
  { keys: '---', label: 'Divider' },
];

export const STEPS: Step[] = [
  { title: 'Open Zodnote', description: 'Your last note is already there. Press ⌘N for a fresh one.', visual: 'open' },
  { title: 'Type /', description: 'Pick a heading, list or to-do, or just keep writing.', visual: 'slash' },
  { title: 'Close it', description: 'Every keystroke is saved to your Mac as you go.', visual: 'saved' },
];

// Real, checkable facts about the app. No invented numbers.
export const FACTS: Fact[] = [
  { value: '0', label: 'accounts to create' },
  { value: '0', label: 'servers your notes touch' },
  { value: '10', label: 'block types' },
  { value: '1', label: 'key to remember' },
];

export const FAQS: FaqEntry[] = [
  {
    question: 'Do I need an account?',
    answer: 'No. There is no sign-up and no login. Open Zodnote and start writing.',
  },
  {
    question: 'Where are my notes saved?',
    answer:
      'On your Mac, in ~/Library/Application Support/Zodnote/notes. Each note is its own small file, so you can back the folder up like anything else.',
  },
  {
    question: 'Does it work offline?',
    answer: 'Yes. Zodnote never connects to the internet, so it works the same on a plane as at your desk.',
  },
  {
    question: 'What can I format?',
    answer:
      'Headings, bulleted and numbered lists, to-dos, quotes, code and dividers, plus bold and italic. Type / to see them all.',
  },
  {
    question: 'Is there a Windows or iPhone version?',
    answer: 'Not yet. Zodnote is Mac-only for now, so it can stay small and fast.',
  },
];
