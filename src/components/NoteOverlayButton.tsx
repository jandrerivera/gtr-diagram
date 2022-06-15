import { useState } from 'react';

import useStore from '../store/store';
import { displaySymbolTypes } from './NoteOverlayCell';

interface NoteOverlayButtonTypes {
  pos: string;
}

const NoteOverlayButton: React.FC<NoteOverlayButtonTypes> = ({ pos }) => {
  const setNotePosition = useStore((state) => state.setNotePosition);
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);

  const [symbolIndex, setSymbolIndex] = useState(displaySymbolTypes);

  const cycleSymbol = () => {
    const newSymbolOrder = [...symbolIndex];
    const next = newSymbolOrder.shift() || 'X';
    newSymbolOrder.push(next);
    setSymbolIndex(newSymbolOrder);

    if (newSymbolOrder[0] === 'empty') {
      unsetNotePosition(pos);
      return;
    }

    setNotePosition({ pos, style: newSymbolOrder[0] });
  };

  return (
    <button
      value={pos}
      // bg-pink-500 opacity-50
      className={`
        relative z-30
      hover:bg-cyan-400 hover:bg-opacity-50
        w-full h-full 
        flex justify-center items-center
      `}
      style={{ gridArea: pos }}
      onClick={cycleSymbol}
    />
  );
};

export default NoteOverlayButton;
