import { useState } from 'react';

import useStore from '../store/store';
import { displaySymbolTypes } from './NoteOverlayCell';

interface NoteOverlayButtonTypes {
  pos: string;
}

const NoteOverlayButton: React.FC<NoteOverlayButtonTypes> = ({ pos }) => {
  const setNotePosition = useStore((state) => state.setNotePosition);
  const posHasNote = useStore((state) => state.posHasNote);
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);

  const [symbolIndex, setSymbolIndex] = useState(displaySymbolTypes);

  // const cycleSymbol = () => {
  //   const newSymbolOrder = [...symbolIndex];
  //   const next = newSymbolOrder.shift() || 'X';
  //   newSymbolOrder.push(next);
  //   setSymbolIndex(newSymbolOrder);

  //   if (newSymbolOrder[0] === 'empty') {
  //     unsetNotePosition(pos);
  //     return;
  //   }

  //   setNotePosition({ pos, style: newSymbolOrder[0] });
  // };

  const toggleSymbol = () => {
    if (posHasNote(pos)) {
      unsetNotePosition(pos);
      return;
    }

    setNotePosition({ pos, style: 'ball' });
  };

  return (
    <button
      value={pos}
      className={`
        relative z-30
        m-1
        rounded-lg
        opacity-50
        hover:bg-cyan-400
        hover:bg-opacity-75
      `}
      style={{ gridArea: pos }}
      onClick={toggleSymbol}
    />
  );
};

export default NoteOverlayButton;
