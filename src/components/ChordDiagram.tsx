import NoteOverlayGrid from './NoteOverlayGrid';
import ChordLabel from './ChordLabel';
import TuningDisplay from './TuningDisplay';
import useStore from '../store/store';

const ChordDiagram = () => {
  // const { enabled: chordLabelenabled } = useStore((state) => state.chordLabel);

  return (
    <>
      {/* {chordLabelenabled && <ChordLabel />} */}
      <TuningDisplay />

      <div
        className={`
        max-w-1xl flex aspect-[100/80] w-full flex-col
        items-stretch justify-start rounded-lg
      `}
      >
        <NoteOverlayGrid />
      </div>
    </>
  );
};
export default ChordDiagram;
