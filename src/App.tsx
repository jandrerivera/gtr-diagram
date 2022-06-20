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
};

function App() {
  const setConfig = useStore((state) => state.setConfig);

  useEffect(() => {
    if (!setConfig) return;

    setConfig(defaultSettings);
  }, []);

  return (
    <div className='flex h-screen min-h-[800px] w-screen flex-col p-2'>
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
