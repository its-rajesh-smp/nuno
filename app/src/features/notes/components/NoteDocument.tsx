import { useCallback, useEffect, useRef } from 'react';
import { Editor } from '@/features/editor/components/Editor';
import type { EditorHandle } from '@/features/editor/types/block';
import { useAutoSave } from '../hooks/useAutoSave';
import type { Note } from '../types/note';
import { NoteTitle, type NoteTitleHandle } from './NoteTitle';
import { SaveErrorNotice } from './ui/SaveErrorNotice';

interface NoteDocumentProps {
  note: Note;
}

// One open note: its title and body, saved as you type. Remounted per note.
export function NoteDocument({ note }: NoteDocumentProps) {
  const titleRef = useRef<NoteTitleHandle>(null);
  const editorRef = useRef<EditorHandle>(null);
  const { queue, error } = useAutoSave();

  const save = useCallback(() => {
    queue({ id: note.id, title: titleRef.current?.value() ?? '', content: editorRef.current?.serialize() ?? '' });
  }, [queue, note.id]);

  useEffect(() => {
    editorRef.current?.load(note.content);
    if (note.title) editorRef.current?.focusEnd();
    else titleRef.current?.focus();
  }, [note]);

  // Clicking the empty space below the text continues writing at the end.
  const focusEndOnBlankClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    editorRef.current?.focusEnd();
  };

  return (
    <div className="flex-1 overflow-y-auto" onMouseDown={focusEndOnBlankClick}>
      <article className="mx-auto min-h-full max-w-[760px] cursor-text px-14 pt-9 pb-[40vh]" onMouseDown={focusEndOnBlankClick}>
        <NoteTitle
          ref={titleRef}
          initialValue={note.title}
          onChange={save}
          onEnter={() => editorRef.current?.focusStart()}
        />
        <Editor ref={editorRef} onChange={save} onExitTop={() => titleRef.current?.focus(true)} />
      </article>
      {error && <SaveErrorNotice message={error} />}
    </div>
  );
}
