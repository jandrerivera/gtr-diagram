import NoteOverlayButton from './NoteOverlayButton';
import NoteOverlaySymbolCell from './NoteOverlaySymbolCell';
import Fretboard from './GuitarParts/Fretboard';
import Nut from './GuitarParts/Nut';

import useStore from '../store/store';

const NoteOverlayGrid = () => {
  const { stringsCount, fretsCount } = useStore((state) => state.config);
  const gridCoordinates = useStore((state) => state.gridCoordinates);
  const notePositions = useStore((state) => state.notePositions);

  return (
    <div
      className={`
        max-w-1xl aspect-[20/16] w-full relative
      `}
    >
      <div
        className={`
          note-overlay-grid
          absolute inset-0 z-10
        `}
      >
        <Nut />
        <Fretboard strings={stringsCount} frets={fretsCount} />

        {gridCoordinates.map((gridCoord, key) => (
          <NoteOverlayButton key={key} gridCoord={gridCoord} />
        ))}

        {notePositions.map((note) => (
          <NoteOverlaySymbolCell key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteOverlayGrid;
