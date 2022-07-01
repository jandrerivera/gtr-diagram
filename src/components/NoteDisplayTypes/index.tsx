import Circle from './Circle';
import Square from './Square';
import Diamond from './Diamond';
import Triangle from './Triangle';
import Crossmark from './Crossmark';
import Barre from './Barre';

import type { NoteType, NoteSymbols, SymbolType } from '../../store/notes.slice';

type DisplaySymbolsType = {
  [value in NoteSymbols]: JSX.Element | null;
};

export type SymbolComponent = {
  note?: NoteType;
  outline?: boolean;
  label?: String;
  span?: number;
  handleRemoveSelf: React.MouseEventHandler;
};

const NoteDisplayTypes = ({
  note,
  symbol: { style, span },
  handleRemoveSelf,
}: {
  note: NoteType;
  symbol: SymbolType;
  handleRemoveSelf: () => void;
}) => {
  const DEFAULT_SYMBOL =
    note.fret === 0 ? (
      <Circle handleRemoveSelf={handleRemoveSelf} outline={true} />
    ) : (
      <Circle handleRemoveSelf={handleRemoveSelf} outline={false} />
    );

  const displaySymbols: DisplaySymbolsType = {
    DEFAULT: DEFAULT_SYMBOL,
    CIRCLE: <Circle handleRemoveSelf={handleRemoveSelf} />,
    SQUARE: <Square handleRemoveSelf={handleRemoveSelf} />,
    DIAMOND: <Diamond handleRemoveSelf={handleRemoveSelf} />,
    TRIANGLE: <Triangle handleRemoveSelf={handleRemoveSelf} />,
    CROSS: <Crossmark handleRemoveSelf={handleRemoveSelf} />,
    CIRCLE_OUTLINE: <Circle outline={true} handleRemoveSelf={handleRemoveSelf} />,
    SQUARE_OUTLINE: <Square outline={true} handleRemoveSelf={handleRemoveSelf} />,
    DIAMOND_OUTLINE: <Diamond outline={true} handleRemoveSelf={handleRemoveSelf} />,
    TRIANGLE_OUTLINE: <Triangle outline={true} handleRemoveSelf={handleRemoveSelf} />,
    CROSS_OUTLINE: <Crossmark outline={true} handleRemoveSelf={handleRemoveSelf} />,
    BARRE: <Barre note={note} span={span} handleRemoveSelf={handleRemoveSelf} />,
    BARRE_OUTLINE: (
      <Barre note={note} span={span} outline={true} handleRemoveSelf={handleRemoveSelf} />
    ),
  };
  return displaySymbols[style];
};

export default NoteDisplayTypes;
