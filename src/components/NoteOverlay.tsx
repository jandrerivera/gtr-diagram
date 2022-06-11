import Circle from './Circle';
import Nut from './Nut';
import Fretboard from './Fretboard';

type NoteOverlayProps = {
  frets: number;
  strings: number;
};

const NoteOverlay = () => {
  const config = {
    noOfFrets: 5,
    noOfStrings: 6,
  };

  return (
    <div
      className={`
        grow 
        grid grid-cols-12 relative z-10 grid-flow-col
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
export default NoteOverlay;

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
          className='relative z-10 h-full w-full flex justify-center items-center'
          style={{
            gridRow: fretPos >= 1 ? fretPos + 2 : fretPos + 1,
            gridColumn: `${columnPos + 1}/${columnPos + 3}`,
          }}
        >
          <Circle
          // label={`${currentString * fretsCount + fretPos}`}
          />
        </div>
      ))}
    </>
  );
};
