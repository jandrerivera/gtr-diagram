import useStore from '../store/store';
import { NoteType } from '../store/notes.slice';

import NoteDisplayTypes from './NoteDisplayTypes';

const NoteOverlaySymbolCell = ({ note }: { note: NoteType }) => {
  const { pos, cssArea, symbol } = note;
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);
  const removeSymbol = () => unsetNotePosition(pos);

  return (
    <div
      className={`
          relative z-20
          flex
          h-full w-full items-center
          justify-center cursor-pointer
        `}
      style={{ gridArea: cssArea }}
    >
      <NoteDisplayTypes note={note} symbol={symbol} handleRemoveSelf={removeSymbol} />
    </div>
  );
};

export default NoteOverlaySymbolCell;
