import { Circle, Crossmark, Barre } from './NoteDisplayTypes';
import { NoteType } from '../store/store';

interface DisplaySymbolsType {
  [key: string]: JSX.Element | null;
}

const NoteOverlaySymbolCell = ({ note }: { note: NoteType }) => {
  const { cssArea, style, span } = note;

  const displaySymbols: DisplaySymbolsType = {
    BALL: <Circle />,
    CIRCLE: <Circle type='outline' />,
    CROSS: <Crossmark />,
    BARRE_START: <Barre span={span} />,
    BARRE_DUMMY: <></>,
    BARRE_END: <></>,
  };

  return (
    <div
      className={`
          relative z-10
          flex
          h-full w-full items-center
          justify-center
        `}
      style={{ gridArea: cssArea }}
    >
      {displaySymbols[style]}
    </div>
  );
};

export default NoteOverlaySymbolCell;
