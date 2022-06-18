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
          relative z-0 -mx-1 -mt-1 flex
          flex-col justify-center
          rounded-b-lg border-x-4 border-b-4
          border-slate-400 bg-white drop-shadow-2xl
        `}
    >
      <div className='relative z-0 grow'>
        <Strings strings={strings} />
        <Frets frets={frets} />
      </div>
    </div>
  );
};
export default Fretboard;
