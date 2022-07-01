import { useRef } from 'react';

import useStore from '../store/store';
import { NoteType } from '../store/notes.slice';
import NoteDisplayTypes from './NoteDisplayTypes';

const NoteOverlaySymbolCell = ({ note }: { note: NoteType }) => {
  const { pos, string, cssArea, symbol } = note;
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);
  const getCssArea = useStore((state) => state.getCssArea);
  const getMaxSpanFromString = useStore((state) => state.getMaxSpanFromString);
  const removeSymbol = () => unsetNotePosition(pos);

  const barreDragAreaRef = useRef<HTMLDivElement>(null);

  const dragAreaSpan = getMaxSpanFromString(string);
  const VISUAL_ADJUST = 3; //visually adjusted to same width as Circle
  const DRAG_AREA_OFFSET = `${(1 / VISUAL_ADJUST / dragAreaSpan) * 100}%`;

  return (
    <>
      <div
        ref={barreDragAreaRef}
        style={{
          left: DRAG_AREA_OFFSET,
          gridArea: getCssArea(note.fret, note.string, dragAreaSpan),
        }}
        className={` absolute inset-0 `}
      />
      <div
        className={`
          relative z-20
          flex
          h-full w-full items-center
          justify-center cursor-pointer
        `}
        style={{ gridArea: cssArea }}
      >
        <NoteDisplayTypes
          note={note}
          symbol={symbol}
          handleRemoveSelf={removeSymbol}
          barreDragAreaRef={barreDragAreaRef}
        />
      </div>
    </>
  );
};

export default NoteOverlaySymbolCell;
