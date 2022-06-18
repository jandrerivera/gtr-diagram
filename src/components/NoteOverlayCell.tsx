import { Circle, Crossmark } from './NoteDisplayTypes';

import { NoteType } from '../store/store';

interface DisplaySymbolsType {
  [key: string]: JSX.Element | null;
}

const displaySymbols: DisplaySymbolsType = {
  empty: null,
  ball: <Circle type='full' />,
  circle: <Circle type='outline' />,
  cross: <Crossmark />,
};

export const displaySymbolTypes = Object.keys(displaySymbols);

interface NoteOverlayCellTypes {
  note: NoteType;
}

const NoteOverlayCell: React.FC<NoteOverlayCellTypes> = ({ note }) => {
  return (
    <div
      className={`
          pointer-events-none relative
          z-50 flex
          h-full w-full items-center
          justify-center
        `}
      style={{ gridArea: note.pos }}
    >
      {displaySymbols[note.style]}
    </div>
  );
};

export default NoteOverlayCell;
