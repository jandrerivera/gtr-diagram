import ChordDiagram from './components/chordDiagram';

import './index.css';

function App() {
  return (
    <div
      className={`
        flex justify-center items-center overflow-auto
        w-screen h-screen p-4 
      `}
    >
      <ChordDiagram />
    </div>
  );
}

export default App;
