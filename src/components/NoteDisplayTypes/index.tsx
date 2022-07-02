import React from 'react';
import Circle from './Circle';
import Square from './Square';
import Diamond from './Diamond';
import Triangle from './Triangle';
import Crossmark from './Crossmark';
import Barre from './Barre';
import BarreSquare from './BarreSquare';

import type { NoteType, BarreType, NoteSymbols, SymbolType } from '../../store/notes.slice';

type DisplaySymbolsType = {
  [value in NoteSymbols]: JSX.Element | null;
};

export type SymbolComponent = {
  note?: NoteType;
  outline?: boolean;
  label?: String;
  span?: number;
  dragAreaRef?: React.RefObject<HTMLDivElement>;
};

const NoteDisplayTypes = ({
  note,
  symbol: { style },
  barreDragAreaRef,
}: {
  note: NoteType;
  symbol: SymbolType;
  barreDragAreaRef: React.RefObject<HTMLDivElement>;
}) => {
  const DEFAULT_SYMBOL = note.fret === 0 ? <Circle outline={true} /> : <Circle outline={false} />;

  const displaySymbols: DisplaySymbolsType = {
    BLANK: <></>,
    DEFAULT: DEFAULT_SYMBOL,
    CIRCLE: <Circle />,
    SQUARE: <Square />,
    DIAMOND: <Diamond />,
    TRIANGLE: <Triangle />,
    CROSS: <Crossmark />,
    CIRCLE_OUTLINE: <Circle outline={true} />,
    SQUARE_OUTLINE: <Square outline={true} />,
    DIAMOND_OUTLINE: <Diamond outline={true} />,
    TRIANGLE_OUTLINE: <Triangle outline={true} />,
    CROSS_OUTLINE: <Crossmark outline={true} />,
    BARRE: <Barre note={note as BarreType} dragAreaRef={barreDragAreaRef} />,
    BARRE_OUTLINE: <Barre note={note as BarreType} outline={true} dragAreaRef={barreDragAreaRef} />,
    BARRE_SQUARE: <BarreSquare note={note as BarreType} dragAreaRef={barreDragAreaRef} />,
    BARRE_SQUARE_OUTLINE: (
      <BarreSquare note={note as BarreType} outline={true} dragAreaRef={barreDragAreaRef} />
    ),
  };
  return displaySymbols[style];
};

export default NoteDisplayTypes;
