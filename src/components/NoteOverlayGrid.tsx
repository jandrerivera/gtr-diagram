import TuningDisplay from './TuningDisplay';
import NoteOverlayButton from './NoteOverlayButton';
import NoteOverlayCell from './NoteOverlayCell';
import Fretboard from './GuitarParts/Fretboard';
import Nut from './GuitarParts/Nut';

import useStore from '../store/store';

const NoteOverlayGrid = () => {
  const { stringsCount, fretsCount } = useStore((state) => state.config);
  const gridCoordinates = useStore((state) => state.gridCoordinates);
  const notePositions = useStore((state) => state.getNotePositionsArr());

  return (
    <div
      className={`
          note-overlay-grid
          grow relative z-10
        `}
    >
      <TuningDisplay />
      <Nut />
      <Fretboard strings={stringsCount} frets={fretsCount} />

      {gridCoordinates.map(({ pos, string, fret }, key) => (
        <NoteOverlayButton key={key} pos={pos} />
      ))}

      {notePositions.map((note, key) => (
        <NoteOverlayCell key={key} note={note} />
      ))}
    </div>
  );
};

export default NoteOverlayGrid;
