import Strings from './Strings';

type FretboardProps = {
  frets: number;
  strings: number;
};

const Fretboard: React.FC<FretboardProps> = ({ frets, strings }) => {
  return (
    <div
      className={`
          pointer-events-none
          rounded-b-lg relative z-0 -my-1 -mx-1
          bg-white drop-shadow-2xl
          flex flex-col justify-center
          border-x-4 border-b-4 border-slate-400
        `}
      style={{
        gridRow: '3/8',
        gridColumn: '2/12',
      }}
    >
      <div className='grow relative z-0'>
        <Strings strings={strings} />
        <Frets frets={frets} />
      </div>
    </div>
  );
};
export default Fretboard;

type FretsProps = {
  frets: number;
};

const Frets: React.FC<FretsProps> = ({ frets }) => {
  return (
    <div
      className={`
        w-full h-full 
        grid grid-rows-5 items-start -mb-1
      `}
    >
      {[...Array(frets)].map((_, key) => (
        <Fretwire key={key} />
      ))}
    </div>
  );
};

const Fretwire = () => {
  return (
    <div
      className={`
        w-full bg-slate-400 h-1
      `}
    />
  );
};
