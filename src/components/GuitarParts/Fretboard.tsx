import Strings from './Strings';
import Frets from './Frets';

type FretboardProps = {
  frets: number;
  strings: number;
};

const Fretboard: React.FC<FretboardProps> = ({ frets, strings }) => {
  return (
    <div
      className={`
          note-overlay__fretboard
          pointer-events-none
          rounded-b-lg relative z-0 -my-1 -mx-1
          bg-white drop-shadow-2xl
          flex flex-col justify-center
          border-x-4 border-b-4 border-slate-400
        `}
    >
      <div className='grow relative z-0'>
        <Strings strings={strings} />
        <Frets frets={frets} />
      </div>
    </div>
  );
};
export default Fretboard;
