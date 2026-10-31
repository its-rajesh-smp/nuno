import { Plus } from 'lucide-react';
import { MockNoteItem } from './ui/MockNoteItem';
import { MockTodo } from './ui/MockTodo';
import { SlashMenuMock } from './ui/SlashMenuMock';

const NOTES = [
  { title: 'Weekend in Lisbon', time: '9:41', active: true },
  { title: 'Book notes', time: '8:15' },
  { title: 'Ideas for the garden', time: 'Oct 28' },
  { title: 'Groceries', time: 'Oct 26' },
];

// A faithful, light-mode mock of the Nuno app window.
export function AppWindowMock() {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-surface text-left shadow-window" aria-label="The Nuno app" role="img">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-line bg-canvas p-3 sm:block">
          <div className="flex gap-2 px-1 pt-1 pb-5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mb-3 flex h-9 items-center justify-center gap-2 rounded-full bg-ink text-[13px] font-semibold text-white">
            <Plus className="size-4" />
            New note
          </div>
          <div className="space-y-px">
            {NOTES.map((note) => (
              <MockNoteItem key={note.title} {...note} />
            ))}
          </div>
        </aside>

        <div className="px-6 pt-8 pb-10 sm:px-12 sm:pt-14">
          <div className="flex gap-2 pb-6 sm:hidden" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-[30px] leading-[1.1] tracking-[-0.035em] text-ink sm:text-[36px]">Weekend in Lisbon</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">Flights are booked. Still need to sort out the rest.</p>
          <p className="mt-5 text-[21px] font-medium tracking-[-0.02em] text-ink">To pack</p>
          <div className="mt-2 space-y-1.5">
            <MockTodo label="Passport" checked />
            <MockTodo label="Chargers" checked />
            <MockTodo label="Sunscreen" />
          </div>
          <p className="mt-4 flex items-center text-[15px] text-ink-soft">
            /
            <span className="ml-px inline-block h-[18px] w-px animate-blink bg-ink" />
          </p>
          <SlashMenuMock className="mt-2" />
        </div>
      </div>
    </div>
  );
}
