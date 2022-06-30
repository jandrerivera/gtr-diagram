import Circle from './Circle';
import Square from './Square';
import Diamond from './Diamond';
import Triangle from './Triangle';
import Crossmark from './Crossmark';
// import Barre from './Barre';

import type { NoteSymbols, SymbolType } from '../../store/notes.slice';

type DisplaySymbolsType = {
  [value in NoteSymbols]: JSX.Element | null;
};

const NoteDisplayTypes = ({ fret, symbol: { style } }: { fret: number; symbol: SymbolType }) => {
  const DEFAULT_SYMBOL = fret === 0 ? <Circle outline={true} /> : <Circle outline={false} />;

  const displaySymbols: DisplaySymbolsType = {
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
    // BARRE_START: <Barre />,
    // BARRE_DUMMY: <></>,
    // BARRE_END: <></>,
  };
  return displaySymbols[style];
};

export default NoteDisplayTypes;
