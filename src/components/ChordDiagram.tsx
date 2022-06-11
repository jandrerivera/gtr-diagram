import TuningDisplay from './TuningDisplay';
import NoteOverlay from './NoteOverlay';

const ChordDiagram = () => {
  return (
    <div
      className={`
        
        w-full max-w-md aspect-[100/120] rounded-lg
        flex flex-col justify-start items-stretch
      `}
    >
      <TuningDisplay />
      <NoteOverlay />
    </div>
  );
};
export default ChordDiagram;
