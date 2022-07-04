import { useRef } from 'react';

import useStore from '../store/store';
import { NoteType, NoteSymbols } from '../store/notes.slice';
import NoteDisplayTypes from './NoteDisplayTypes';

const NoteOverlaySymbolCell = ({ note }: { note: NoteType }) => {
  const { pos, string, cssArea, symbol } = note;
  const getCssArea = useStore((state) => state.getCssArea);
  const getMaxSpanFromString = useStore((state) => state.getMaxSpanFromString);

  const barreDragAreaRef = useRef<HTMLDivElement>(null);
  const dragAreaSpan = getMaxSpanFromString(string);
  const DRAG_AREA_OFFSET = `${100 / (dragAreaSpan - 1)}%`;

  if (note?.symbol?.style === NoteSymbols.blank) return <></>;

  return (
    <>
      <div
        className={`
          relative z-20
          flex items-center justify-center 
          h-auto w-full 
          cursor-pointer
          `}
        // ${note?.symbol?.style === NoteSymbols.blank && 'pointer-events-none'}
        // bg-pink-400 bg-opacity-50
        style={{ gridArea: cssArea }}
      >
        <NoteDisplayTypes note={note} symbol={symbol} barreDragAreaRef={barreDragAreaRef} />
      </div>
      <div
        ref={barreDragAreaRef}
        style={{
          left: DRAG_AREA_OFFSET,
          gridArea: getCssArea(note.fret, note.string, dragAreaSpan),
        }}
        className={`absolute inset-0`}
      />
    </>
  );
};

export default NoteOverlaySymbolCell;
