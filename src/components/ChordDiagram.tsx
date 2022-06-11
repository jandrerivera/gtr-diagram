import TuningDisplay from './TuningDisplay';
import NoteOverlayGrid from './NoteOverlayGrid';

const ChordDiagram = () => {
  return (
    <div
      className={`
        flex flex-col justify-start items-stretch
        w-full max-w-lg aspect-[100/120] rounded-lg
      `}
    >
      <TuningDisplay />
      <NoteOverlayGrid />
    </div>
  );
};
export default ChordDiagram;
