import { useEffect, useRef } from 'react'

import ExportRegion from './components/ExportRegion'
import ChordDiagram from './components/ChordDiagram'

import './index.css'
import ControlsMenu from './components/ControlsMenu/ControlsMenu'
import useStore from './store/store'

export const defaultSettings = {
  stringsCount: 6,
  fretsCount: 5,
  defaultChordLabel: 'Cmaj7',
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
}

function App() {
  const setConfig = useStore((state) => state.setConfig)

  useEffect(() => {
    if (!setConfig) return

    setConfig(defaultSettings)
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
