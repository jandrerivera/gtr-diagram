import { useCallback, useRef } from 'react';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import useStore from '../store/store';

const ControlsMenu = () => {
  const { toggleChordLabel } = useStore((state) => state.chordLabel);

  // console.log('draw');

  // const handleReset = () => {
  //   console.log('reset');
  // };
  // const toggleChordLabel = () => {};

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
    <ul
      className={`
          mx-auto
          mb-2 flex shrink-0
          flex-row divide-x overflow-auto rounded-xl
          border
          border-slate-100 bg-white
          font-bold 
          shadow-lg
          `}
    >
      {/* <li>
          <button onClick={handleReset} className='py-2 px-4 text-slate-500 hover:bg-neutral-100'>
            Reset
          </button>
        </li> */}
      <li>
        <button
          onClick={() => toggleChordLabel()}
          className='py-2 px-4 text-slate-500 hover:bg-neutral-100'
        >
          Chord Label
        </button>
      </li>
      <li>
        <button onClick={handleExport} className='py-2 px-4 text-slate-500 hover:bg-neutral-100'>
          Export as JPG
        </button>
      </li>
    </ul>
  );
};
export default ControlsMenu;
