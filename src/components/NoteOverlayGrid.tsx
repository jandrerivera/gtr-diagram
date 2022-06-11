import Nut from './Nut';
import Fretboard from './Fretboard';
import NoteOverlayButton from './NoteOverlayButton';

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
        grow 
        grid grid-cols-12 relative z-10 grid-flow-col gap-y-1 gap-x-1
      `}
      style={{
        gridTemplateRows: '3fr 1fr repeat(5, minmax(0, 4fr))',
      }}
    >
      <Nut style={{ gridArea: '2/2/2/12' }} />
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
  const columnPos = currentString * 2; //we use two columns per string...

  return (
    <>
      {[...Array(fretsCount)].map((_, fretPos) => (
        <div
          key={fretPos}
          className={`
             relative z-10
          `}
          style={{
            gridRow: fretPos >= 1 ? fretPos + 2 : fretPos + 1,
            gridColumn: `${columnPos + 1}/${columnPos + 3}`,
          }}
        >
          <NoteOverlayButton pos={currentString * fretsCount + fretPos} />
        </div>
      ))}
    </>
  );
};
