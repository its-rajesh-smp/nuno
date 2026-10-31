import { useRef, type Ref } from 'react';
import { useBlockEditor } from '../hooks/useBlockEditor';
import type { EditorHandle } from '../types/block';
import { SlashMenu } from './SlashMenu';

interface EditorProps {
  ref?: Ref<EditorHandle>;
  onChange: () => void;
  onExitTop: () => void;
}

export function Editor({ ref, onChange, onExitTop }: EditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { menu, selectOption, highlight, closeMenu } = useBlockEditor({ rootRef, handleRef: ref, onChange, onExitTop });

  return (
    <>
      {/* React never renders inside this element; the block editor owns its DOM. */}
      <div ref={rootRef} className="note-editor" contentEditable suppressContentEditableWarning spellCheck />
      <SlashMenu menu={menu} onSelect={selectOption} onHighlight={highlight} onClose={closeMenu} />
    </>
  );
}
