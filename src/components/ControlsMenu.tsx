import { useCallback, useRef } from 'react';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import useStore from '../store/store';
import { NoteSymbols } from '../store/notes.slice';

const ControlsMenu = () => {
  const setSelectedControl = useStore((state) => state.setSelectedControl);

  const symbolControls = Object.entries(NoteSymbols).filter(([name]) => name !== 'default');
  // console.log(symbolControls);

  // const toggleChordLabel = useStore((state) => state.toggleChordLabel);

  // console.log('draw');

  // const handleReset = () => {
  //   console.log('reset');
  // };
  // const toggleChordLabel = () => {};

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
          mx-auto
          mb-2 flex flex-col items-stretch justify-start
          divide-y-2 divide-slate-500 overflow-auto rounded-lg
          border-2
          border-slate-500 bg-white
          font-bold 
          shadow-lg
          `}
    >
      {symbolControls.map(([name, noteSymbol], key) => (
        <li key={key}>
          <button
            onClick={() => setSelectedControl(noteSymbol)}
            className='w-full py-2 px-4 text-slate-500 hover:bg-neutral-200 '
          >
            {name}
          </button>
        </li>
      ))}

      {/* <li>
          <button onClick={handleReset} className='py-2 px-4 text-slate-500 hover:bg-neutral-100'>
            Reset
          </button>
        </li> */}
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
export default ControlsMenu;
