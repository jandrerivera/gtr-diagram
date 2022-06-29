import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import useStore from '../store/store';
import type { GridCoordinateType } from '../store/grid.slice';
import { getPos } from '../utils/grid';
import BarreDragControl from './OverlayGridControls/BarreDragControls';

interface NoteOverlayButtonTypes {
  gridCoord: GridCoordinateType;
}

const NoteOverlayButton: React.FC<NoteOverlayButtonTypes> = ({ gridCoord }) => {
  const { pos, cssArea, fret, string } = gridCoord;

  const posHasNote = useStore((state) => state.posHasNote(pos));
  const setNotePosition = useStore((state) => state.setNotePosition);
  const getNoteAtPosition = useStore((state) => state.getNoteAtPosition);
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);
  const setBarrePosition = useStore((state) => state.setBarrePosition);

  const [showBarreControls, setShowBarreControls] = useState(false);
  const [buttonRef, buttonRefBounds] = useMeasure();

  // if (posHasNote) {
  //   const { style: symbolStyle } = getNoteAtPosition(pos);
  // }

  const handleClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return; //Stops dragging on Barre Control from setting a note

    // toggleSymbol();

    if (posHasNote) {
      const { style: symbolStyle } = getNoteAtPosition(pos);

      if (symbolStyle === 'BARRE_END' || symbolStyle === 'BALL') {
        setShowBarreControls(true);
        return;
      }

      // if (symbolStyle !== 'dummy') {
      //   removeSymbol();
      //   return;
      // }

      return;
    }

    setSymbol();
  };

  // // const toggleSymbol = () => {
  // //   if (posHasNote) {
  // //     removeSymbol();
  // //     return;
  // //   }

  // //   setSymbol();
  // // };

  const setSymbol = () => setNotePosition({ ...gridCoord, style: 'default' });
  const removeSymbol = () => {
    // if (showBarreControls) return;
    unsetNotePosition(pos);
  };

  const setBarreNote = (span: number) => {
    // unsetNotePosition(pos);
    setShowBarreControls(false);

    setBarrePosition(gridCoord, span);
  };

  return (
    <button
      ref={buttonRef}
      value={pos}
      className={`
        relative z-20
        `}
      // bg-opacity-20
      style={{ gridArea: cssArea }}
      onClick={handleClick}
    >
      {/* {pos} */}
      {showBarreControls && (
        <BarreDragControl parentBounds={buttonRefBounds} setBarreHandler={setBarreNote} />
      )}
    </button>
  );
};

export default NoteOverlayButton;
