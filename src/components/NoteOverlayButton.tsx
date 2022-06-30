import useStore from '../store/store';
import type { GridCoordinateType } from '../store/grid.slice';
import { NoteSymbols } from '../store/notes.slice';

const NoteOverlayButton = ({ gridCoord }: { gridCoord: GridCoordinateType }) => {
  const { pos, cssArea } = gridCoord;

  const posHasNote = useStore((state) => state.getPosHasNote(pos));
  const setNotePosition = useStore((state) => state.setNotePosition);
  const selectedControl = useStore((state) => state.selectedControl);

  const handleClick = () => {
    if (posHasNote) return;
    return setNotePosition({ ...gridCoord, symbol: { style: selectedControl } });
  };

  return (
    <button
      className={`
        relative z-20
      `}
      // bg-opacity-20
      style={{ gridArea: cssArea }}
      onClick={handleClick}
    />
  );
};

export default NoteOverlayButton;
