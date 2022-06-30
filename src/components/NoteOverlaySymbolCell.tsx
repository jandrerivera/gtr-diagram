import useStore from '../store/store';

import NoteDisplayTypes from './NoteDisplayTypes';
import type { NoteType } from '../store/notes.slice';

const NoteOverlaySymbolCell = ({ note }: { note: NoteType }) => {
  const { pos, fret, cssArea, symbol } = note;
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);

  const removeSymbol = () => {
    // if (showBarreControls) return;
    unsetNotePosition(pos);
  };

  return (
    <div
      className={`
          relative z-20
          flex
          h-full w-full items-center
          justify-center cursor-pointer
        `}
      style={{ gridArea: cssArea }}
      onClick={removeSymbol}
    >
      <NoteDisplayTypes fret={fret} symbol={symbol} />
    </div>
  );
};

export default NoteOverlaySymbolCell;
