import { useEffect, useRef } from 'react';

import ExportRegion from './components/ExportRegion';
import ChordDiagram from './components/ChordDiagram';

import './index.css';
import ControlsMenu from './components/ControlsMenu';
import useStore from './store/store';

export const defaultSettings = {
  stringsCount: 6,
  fretsCount: 5,
  defaultChordLabel: 'Cmaj7',
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
};

function App() {
  const setConfig = useStore((state) => state.setConfig);
  // const notePositions = useStore((state) => state.getNotePositionsArr());
  // console.log(notePositions);
  // console.log(
  //   notePositions.filter((item) => {
  //     return item.style === 'BARRE_START';
  //   }).length
  // );

  useEffect(() => {
    if (!setConfig) return;

    setConfig(defaultSettings);
  }, []);

  return (
    <div className='flex h-screen min-h-screen w-screen flex-col p-2'>
      <ControlsMenu />
      <div
        className={`
          flex grow flex-col items-center justify-center p-4 
        `}
      >
        <ExportRegion>
          <ChordDiagram />
        </ExportRegion>
      </div>
    </div>
  );
}

export default App;
