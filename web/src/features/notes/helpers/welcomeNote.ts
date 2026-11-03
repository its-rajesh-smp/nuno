import type { NoteDraft } from '../types/note';

// Shown once, on the very first visit.
export const WELCOME_NOTE: NoteDraft = {
  title: 'Welcome to Zodnote',
  content: [
    '<p>Just start typing. Everything saves automatically, in this browser only.</p>',
    '<h2>Try it</h2>',
    '<div class="todo">Type <b>/</b> on an empty line to pick a heading, list, to-do and more</div>',
    '<div class="todo">Or use shortcuts: <b>#</b> <b>##</b> <b>-</b> <b>1.</b> <b>[]</b> <b>&gt;</b> followed by a space</div>',
    '<div class="todo">Press ⌥⌘N for a new note and ⌘\\ to hide the sidebar</div>',
    '<p><br></p>',
  ].join(''),
};
