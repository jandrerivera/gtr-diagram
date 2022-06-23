import NoteOverlayButton from './NoteOverlayButton';
import NoteOverlaySymbolCell from './NoteOverlaySymbolCell';
import Fretboard from './GuitarParts/Fretboard';
import Nut from './GuitarParts/Nut';

import useStore from '../store/store';
import { useEffect, useRef } from 'react';

const NoteOverlayGrid = () => {
  const { stringsCount, fretsCount } = useStore((state) => state.config);
  const gridCoordinates = useStore((state) => state.gridCoordinates);
  const notePositions = useStore((state) => state.getNotePositionsArr());

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const setDragAreaRef = useStore((state) => state.setDragAreaRef);

  useEffect(() => {
    setDragAreaRef(dragAreaRef);
  }, [dragAreaRef]);

  return (
    <div
      className={`
          note-overlay-grid
          relative z-10
          grow
        `}
    >
      <div
        ref={dragAreaRef}
        className='note-overlay__dragArea bg-transparent pointer-events-none mx-2'
      />

      <Nut />
      <Fretboard strings={stringsCount} frets={fretsCount} />

      {gridCoordinates.map((gridCoord, key) => (
        <NoteOverlayButton key={key} gridCoord={gridCoord} />
      ))}

      {notePositions.map((note, key, boundsRef) => (
        <NoteOverlaySymbolCell key={key} note={note} />
      ))}
    </div>
  );
};

export default NoteOverlayGrid;
