import TuningDisplay from './TuningDisplay';
import NoteOverlayButton from './NoteOverlayButton';
import Fretboard from './GuitarParts/Fretboard';
import Nut from './GuitarParts/Nut';
import { getPos } from '../utils/helpers/grid';

const NoteOverlayGrid = () => {
  const config = {
    noOfFrets: 5,
    noOfStrings: 6,
  };

  return (
    <div
      className={`
          note-overlay-grid
          grow relative z-10
        `}
    >
      <TuningDisplay />
      <Nut />
      <Fretboard strings={config.noOfStrings} frets={config.noOfFrets} />

      {[...Array(config.noOfStrings)].map((_, string) => (
        <NoteOverlayCol key={string} frets={config.noOfFrets + 1} string={string} />
      ))}
    </div>
  );
};

const NoteOverlayCol: React.FC<{
  frets: number;
  string: number;
}> = ({ frets, string }) => {
  return (
    <>
      {[...Array(frets)].map((_, fret) => (
        <div
          key={fret}
          className={` relative z-10 `}
          style={{ gridArea: `${getPos(fret, string)}` }}
        >
          <NoteOverlayButton pos={getPos(fret, string)} />
        </div>
      ))}
    </>
  );
};

export default NoteOverlayGrid;
