import { useEffect, useRef } from 'react';

import ExportRegion from './components/ExportRegion';
import ChordDiagram from './components/ChordDiagram';
import ChordLabel from './components/ChordLabel';

import './index.css';
import ControlsMenu from './components/ControlsMenu';
import useStore from './store/store';

function App() {
  const config = useStore((state) => state.setConfig);

  config({
    stringsCount: 6,
    fretsCount: 5,
  });

  return (
    <div
      className={`
        flex flex-col justify-center items-center overflow-auto
        w-screen h-screen p-4 
      `}
    >
      <ControlsMenu />
      <ExportRegion>
        {/* <ChordLabel /> */}
        <ChordDiagram />
      </ExportRegion>
    </div>
  );
}

export default App;
