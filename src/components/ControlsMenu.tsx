import { useCallback, useRef } from 'react';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const ControlsMenu = () => {
  // console.log('draw');

  // const handleReset = () => {
  //   console.log('reset');
  // };

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
    <div>
      <ul
        className={`
          flex flex-row
          border boder-slate-100 shadow-lg divide-x
          overflow-hidden
          bg-white rounded-xl
          font-bold 
          mb-6
        `}
      >
        {/* <li>
          <button onClick={handleReset} className='py-2 px-4 text-slate-500 hover:bg-neutral-100'>
            Reset
          </button>
        </li> */}
        <li>
          <button onClick={handleExport} className='py-2 px-4 text-slate-500 hover:bg-neutral-100'>
            Export as JPG
          </button>
        </li>
      </ul>
    </div>
  );
};
export default ControlsMenu;
