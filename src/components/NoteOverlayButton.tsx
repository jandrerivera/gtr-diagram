import { useState, useEffect } from 'react';
import { Circle, Crossmark } from './NoteDisplayTypes';

interface DisplaySymbolsType {
  [key: string]: JSX.Element;
}

const displaySymbols: DisplaySymbolsType = {
  empty: <></>,
  ball: <Circle type='full' />,
  circle: <Circle type='outline' />,
  cross: <Crossmark />,
};

const displayIndex = Object.keys(displaySymbols);

interface NoteOverlayButtonTypes {
  pos: number;
}

const NoteOverlayButton: React.FC<NoteOverlayButtonTypes> = ({ pos }) => {
  const [symbolIndex, setSymbolIndex] = useState(displayIndex);

  const cycleSymbol = () => {
    const newSymbolOrder = [...symbolIndex];
    const next = newSymbolOrder.shift() || 'X';
    newSymbolOrder.push(next);

    setSymbolIndex(newSymbolOrder);
  };

  return (
    <button
      value={pos}
      // hover:bg-cyan-400 hover:bg-opacity-50
      className={`
        w-full h-full
        flex justify-center items-center
      `}
      onClick={cycleSymbol}
    >
      {displaySymbols[symbolIndex[0]]}
    </button>
  );
};

export default NoteOverlayButton;
