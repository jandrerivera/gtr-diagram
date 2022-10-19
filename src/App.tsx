import { useEffect, useRef } from 'react'

import ExportRegion from './components/ExportRegion'
import ChordDiagram from './components/ChordDiagram'

import ControlsMenu from './components/ControlsMenu/ControlsMenu'
import useChordChartStore from './store/chordChart/chordChart.store'

import './index.css'

function App() {
  const setConfig = useChordChartStore((state) => state.setConfig)

  useEffect(() => {
    if (!setConfig) return
    setConfig({
      stringsCount: 6,
      tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    })
  }, [])

  return (
    <div
      className={`
        mx-auto
        h-screen min-h-screen w-screen max-w-4xl
      `}
    >
      <div
        className={`
          flex h-full w-full flex-row items-center justify-center
          gap-2 p-2
          `}
      >
        <ControlsMenu />
        <div
          className={`
          flex h-full grow flex-col items-center justify-center
        `}
        >
          <ExportRegion>
            <ChordDiagram />
          </ExportRegion>
        </div>
      </div>
    </div>
  )
}

export default App
