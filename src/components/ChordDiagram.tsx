import NoteOverlayGrid from './NoteOverlayGrid';

const ChordDiagram = () => {
  return (
    <div
      className={`
        flex flex-col justify-start items-stretch p-4
        w-full max-w-1xl aspect-[100/90] rounded-lg
      `}
    >
      <NoteOverlayGrid />
    </div>
  );
};
export default ChordDiagram;
