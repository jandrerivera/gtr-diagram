import { useCallback, useRef } from 'react';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import useStore from '../store/store';
import { NoteSymbols } from '../store/notes.slice';

const ControlsMenu = () => {
  const resetNotePositions = useStore((state) => state.resetNotePositions);

  // const toggleChordLabel = useStore((state) => state.toggleChordLabel);

  // const handleExport = () => {
  //   const exportRegion = document.getElementById('exportRegion');

  //   if (exportRegion === null) {
  //     return;
  //   }
  //   console.log('export');

  //   toJpeg(exportRegion, { quality: 0.95 })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a');
  //       link.download = 'chord-chart.jpg';
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <ul
      className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        overflow-auto rounded-lg bg-white
        border-2 divide-y-2 divide-slate-500 border-slate-500 
        text-xs
        shadow-lg
      `}
    >
      <li>
        <SymbolSelectMenu />
      </li>

      <li>
        <button
          onClick={resetNotePositions}
          className={`
            w-full py-2 px-4 bg-white text-slate-500 md:hover:bg-neutral-200
          `}
        >
          Reset
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
      <li>
        <button
          onClick={handleExport}
          className='w-full py-2 px-4 text-slate-500 hover:bg-neutral-200 '
        >
          Export as JPG
        </button>
      </li> */}
    </ul>
  );
};

const SymbolSelectMenu = () => {
  const selectedControl = useStore((state) => state.selectedControl);
  const setSelectedControl = useStore((state) => state.setSelectedControl);

  const symbolControls = Object.entries(NoteSymbols); //.filter(([name]) => name !== 'default');

  const onClickSymbolSelect = (clickedDymbol: NoteSymbols) => {
    if (selectedControl === clickedDymbol) return setSelectedControl(NoteSymbols.default);
    setSelectedControl(clickedDymbol);
  };
  return (
    <ul className='divide-y divide-slate-500'>
      {symbolControls.map(([name, symbol], key) => (
        <li key={key}>
          <button
            onClick={() => onClickSymbolSelect(symbol)}
            className={`
              w-full py-2 px-4 
                ${selectedControl !== symbol && 'bg-white text-slate-500  md:hover:bg-neutral-200'}
                ${selectedControl === symbol && 'bg-slate-500 text-slate-100 md:hover:bg-slate-400'}
              `}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ControlsMenu;
