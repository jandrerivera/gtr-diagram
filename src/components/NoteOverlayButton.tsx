import { useState } from 'react';
import useStore from '../store/store';
import type { GridCoordinateType } from '../store/grid.slice';
import { NoteSymbols } from '../store/notes.slice';

const NoteOverlayButton = ({ gridCoord }: { gridCoord: GridCoordinateType }) => {
  const { pos, fret, string } = gridCoord;

  const [showPreview, setShowPreview] = useState(false);

  const { stringsCount } = useStore((state) => state.config);
  const selectedControl = useStore((state) => state.selectedControl);
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);

  const note = useStore((state) => state.getNoteAtPosition(pos));
  const setBarrePosition = useStore((state) => state.setBarrePosition);
  const setNotePosition = useStore((state) => state.setNotePosition);
  const getCssArea = useStore((state) => state.getCssArea);
  const getMaxSpanFromString = useStore((state) => state.getMaxSpanFromString);

  const isBarre = (symbol?: NoteSymbols) => {
    if (!symbol) return false;
    return symbol === NoteSymbols.barre || symbol === NoteSymbols.barreOutline;
  };

  const handleClick = () => {
    if (isBarre(selectedControl)) {
      setShowPreview(false);
      return setBarrePosition({ ...gridCoord, symbol: { style: selectedControl } });
    }

    if (note) return unsetNotePosition(pos);

    setShowPreview(false);
    return setNotePosition({ ...gridCoord, symbol: { style: selectedControl } });
  };

  const previewSpan = isBarre(selectedControl) ? getMaxSpanFromString(string) : 1;
  const filledButton = note && isBarre(note.symbol.style) ? note.symbol.span : 1;
  const buttonSpan = isBarre(selectedControl) && string === stringsCount - 1 ? 2 : filledButton;

  //Remove self if is unusable when Barre is selected
  if (isBarre(selectedControl) && string === stringsCount) return <></>;
  if (note?.symbol?.style === NoteSymbols.blank) return <></>;

  return (
    <>
      <button
        className={`
          group
          relative z-50
          transition-colors
          bg-lime-400 bg-opacity-50
          ${isBarre(note?.symbol?.style) && 'pointer-events-none'}
          `}
        style={{ gridArea: getCssArea(fret, string, buttonSpan) }}
        onClick={handleClick}
        onMouseEnter={() => !note && setShowPreview(true)}
        onMouseLeave={() => !note && setShowPreview(false)}
      />
      <div
        className={`
        relative z-10
        m-2 rounded-lg
        bg-emerald-300
        transition-opacity
        ${showPreview ? 'opacity-40' : 'opacity-0'}
        `}
        style={{ gridArea: getCssArea(fret, string, previewSpan) }}
      />
    </>
  );
};

export default NoteOverlayButton;
