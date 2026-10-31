import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';

export interface NoteTitleHandle {
  value: () => string;
  focus: (atEnd?: boolean) => void;
}

interface NoteTitleProps {
  ref?: Ref<NoteTitleHandle>;
  initialValue: string;
  onChange: () => void;
  onEnter: () => void;
}

// Uncontrolled on purpose: re-rendering a contentEditable while typing moves the caret.
export function NoteTitle({ ref, initialValue, onChange, onEnter }: NoteTitleProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current) elRef.current.textContent = initialValue;
  }, [initialValue]);

  useImperativeHandle(ref, () => ({
    value: () => elRef.current?.textContent?.trim() ?? '',
    focus: (atEnd = false) => {
      const el = elRef.current;
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(!atEnd);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    },
  }));

  return (
    <div
      ref={elRef}
      role="textbox"
      aria-label="Note title"
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder="Untitled"
      onInput={(e) => {
        // Clear leftover <br>s so the :empty placeholder comes back.
        if (!e.currentTarget.textContent) e.currentTarget.replaceChildren();
        onChange();
      }}
      onKeyDown={(e) => {
        if (e.nativeEvent.isComposing || (e.key !== 'Enter' && e.key !== 'ArrowDown')) return;
        e.preventDefault();
        onEnter();
      }}
      className="mb-3 text-[40px] leading-[1.1] font-normal tracking-[-0.035em] text-balance text-ink outline-none empty:before:pointer-events-none empty:before:float-left empty:before:h-0 empty:before:text-line-strong empty:before:content-[attr(data-placeholder)]"
    />
  );
}
