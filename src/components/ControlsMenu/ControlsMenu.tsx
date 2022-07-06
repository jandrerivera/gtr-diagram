import useStore from '../../store/store';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { NoteSymbols } from '../../store/notes.slice';
import {
  ControlsMenuDisplaySymbols,
  ControlsMenuDisplaySymbolsType,
} from '../../store/controls.slice';

import ControlsMenuIcon from './ControlsMenuIcon';
import { RiDeleteBin2Line, RiDownload2Fill } from 'react-icons/ri';

const ControlsMenu = () => {
  const resetNotePositions = useStore((state) => state.resetNotePositions);

  // const toggleChordLabel = useStore((state) => state.toggleChordLabel);

  const handleExport = () => {
    const exportRegion = document.getElementById('exportRegion');

    if (exportRegion === null) {
      return;
    }
    console.log('export');

    toJpeg(exportRegion, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'chord-chart.jpg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=''>
      <SymbolSelectMenu />

      <ul
        className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        overflow-auto rounded-lg bg-white
        border-2 divide-y divide-slate-500 border-slate-500 
        text-xs
        shadow-lg
      `}
      >
        <li>
          <button
            onClick={resetNotePositions}
            className={` p-1 w-full text-slate-500 hover:bg-neutral-200 flex justify-start items-center gap-1`}
          >
            <RiDeleteBin2Line className='w-6  fill-slate-500' />
            <div>Reset</div>
          </button>
        </li>
      </ul>

      <ul
        className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        overflow-auto rounded-lg bg-white
        border-2 divide-y divide-slate-500 border-slate-500 
        text-xs
        shadow-lg
      `}
      >
        <li>
          <button
            onClick={handleExport}
            className={` p-1 w-full text-slate-500 hover:bg-neutral-200 flex justify-start items-center gap-1`}
          >
            <RiDownload2Fill className='w-6 fill-slate-500' />
            <div>Export</div>
          </button>
        </li>
        {/* <li>
        <button
          onClick={() => toggleChordLabel()}
          className='w-full py-2 px-4 text-slate-500 hover:bg-neutral-200 '
        >
          Chord Label
        </button>
      </li>
       */}
      </ul>
    </div>
  );
};

const SymbolSelectMenu = () => {
  const selectedControl = useStore((state) => state.selectedControl);
  const setSelectedControl = useStore((state) => state.setSelectedControl);

  const symbolControls = Object.entries(ControlsMenuDisplaySymbols);

  const onClickSymbolSelect = (clickedDymbol: ControlsMenuDisplaySymbolsType) => {
    if (selectedControl === clickedDymbol) return setSelectedControl(NoteSymbols.default);
    setSelectedControl(clickedDymbol);
  };

  return (
    <ul
      className={`
        mx-auto overflow-hidden
        rounded-lg shadow-lg text-xs
        border-2 border-slate-500 bg-slate-500 
        items-stretch justify-start
        grid grid-cols-2 gap-[1px]
        mb-2
      `}
    >
      {symbolControls.map(([name, symbol], key) => (
        <li key={key} className={``}>
          <button
            onClick={() => onClickSymbolSelect(symbol)}
            className={`
              w-9 p-1
                ${selectedControl !== symbol && 'bg-white text-slate-500  md:hover:bg-neutral-200'}
                ${selectedControl === symbol && 'bg-slate-500 text-slate-100 md:hover:bg-slate-400'}
              `}
          >
            <ControlsMenuIcon symbol={symbol} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ControlsMenu;
