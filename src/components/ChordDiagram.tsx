import NoteOverlayGrid from './NoteOverlayGrid';
import ChordLabel from './ChordLabel';
import TuningDisplay from './TuningDisplay';
import useStore from '../store/store';

const ChordDiagram = () => {
  // const { enabled: chordLabelenabled } = useStore((state) => state.chordLabel);

  return (
    <div
      className={`
        mx-auto
        max-w-2xl w-full h-auto
        flex flex-col
        justify-start items-center
      `}
    >
      {/* {chordLabelenabled && <ChordLabel />} */}
      <TuningDisplay />
      <NoteOverlayGrid />
    </div>
  );
};
export default ChordDiagram;
