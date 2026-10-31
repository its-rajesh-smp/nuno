import { useEffect, useMemo, useRef } from 'react';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { getCaretRect } from '../helpers/caret';
import type { BlockOption, SlashMenuState } from '../types/block';
import { SlashMenuItem } from './ui/SlashMenuItem';

interface SlashMenuProps {
  menu: SlashMenuState;
  onSelect: (option: BlockOption) => void;
  onHighlight: (index: number) => void;
  onClose: () => void;
}

export function SlashMenu({ menu, onSelect, onHighlight, onClose }: SlashMenuProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const block = menu.block;

  // Anchored to the live caret position, so the menu follows scrolling.
  const caretRef = useMemo(() => ({ current: { getBoundingClientRect: () => getCaretRect(block) } }), [block]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active]')?.scrollIntoView({ block: 'nearest' });
  }, [menu.index, menu.options]);

  return (
    <Popover open={menu.open} onOpenChange={(open) => !open && onClose()}>
      <PopoverAnchor virtualRef={caretRef} />
      <PopoverContent
        ref={listRef}
        role="listbox"
        collisionPadding={8}
        className="max-h-[340px] w-[300px] overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      >
        {menu.options.map((option, index) => (
          <SlashMenuItem
            key={option.type}
            option={option}
            active={index === menu.index}
            onSelect={() => onSelect(option)}
            onHover={() => onHighlight(index)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
