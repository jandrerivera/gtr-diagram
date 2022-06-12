import TuningDisplay from './TuningDisplay';
import Nut from './Nut';
import Fretboard from './Fretboard';
import NoteOverlayButton from './NoteOverlayButton';

import { getColLetter } from '../utils/helpers/grid';

type NoteOverlayProps = {
  frets: number;
  strings: number;
};

const NoteOverlayGrid = () => {
  const config = {
    noOfFrets: 5,
    noOfStrings: 6,
  };

  return (
    <div
      className={`
          grow relative z-10
          note-overlay-grid
        `}
    >
      <TuningDisplay />
      <Nut />
      <Fretboard strings={config.noOfStrings} frets={config.noOfFrets} />

      {[...Array(config.noOfStrings)].map((_, i) => (
        <NoteOverlayCol key={i} fretsCount={config.noOfFrets + 1} currentString={i} />
      ))}
    </div>
  );
};
export default NoteOverlayGrid;

interface NoteOverlayColProps {
  fretsCount: number;
  currentString: number;
}

const NoteOverlayCol: React.FC<NoteOverlayColProps> = ({ fretsCount, currentString }) => {
  return (
    <>
      {[...Array(fretsCount)].map((_, fretPos) => (
        <div
          key={fretPos}
          className={`
             relative z-10
          `}
          style={{
            gridArea: `pos${getColLetter(currentString + 1)}${fretPos}`,
          }}
        >
          <NoteOverlayButton pos={currentString * fretsCount + fretPos} />
        </div>
      ))}
    </>
  );
};
