import useChordChartStore from '../../store/chordChart/chordChart.store'
import useControlsStore from '../../store/controls.store'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import {
  NoteSymbols,
  BasicNoteSymbols,
  BasicNoteSymbolsType,
} from '../../store/chordChart/slices/notes.slice'
import ControlsMenuIcon from './ControlsMenuIcon'
import { RiDeleteBin2Line, RiDownload2Fill } from 'react-icons/ri'

const SymbolSelectSubMenu = () => {
  const selectedControl = useControlsStore((state) => state.selectedControl)
  const setSelectedControl = useControlsStore((state) => state.setSelectedControl)

  const symbolControls = Object.entries(BasicNoteSymbols)

  const onClickSymbolSelect = (clickedDymbol: BasicNoteSymbolsType) => {
    if (selectedControl === clickedDymbol) return setSelectedControl(NoteSymbols.default)
    setSelectedControl(clickedDymbol)
  }

  return (
    <ul
      className={`
        mx-auto mb-2
        grid grid-cols-2 items-stretch
        justify-start gap-[1px] overflow-hidden 
        rounded-lg border-2
        border-slate-500 bg-slate-500 text-xs
        shadow-lg
      `}
    >
      {symbolControls.map(([name, symbol], key) => (
        <li key={key} className={``}>
          <button
            onClick={() => onClickSymbolSelect(symbol)}
            className={`
              w-9 p-1
                ${selectedControl !== symbol && 'bg-white text-slate-500  md:hover:bg-neutral-200'}
                ${selectedControl === symbol && 'bg-slate-500 text-slate-100 md:hover:bg-slate-400'}
              `}
          >
            <ControlsMenuIcon symbol={symbol} />
          </button>
        </li>
      ))}
    </ul>
  )
}

export const FretMarketToggleSubMenu = () => {
  const toggleFretMarker = useChordChartStore((state) => state.toggleFretMarker)

  return (
    <ul
      className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        divide-y divide-slate-500 overflow-auto
        rounded-lg border-2 border-slate-500 bg-white 
        text-xs
        shadow-lg
      `}
    >
      <li>
        <button
          onClick={toggleFretMarker}
          className={` flex w-full items-center justify-start gap-1 p-1 text-slate-500 hover:bg-neutral-200`}
        >
          <div>Fret Marker</div>
        </button>
      </li>
    </ul>
  )
}

export const ResetButtonSubMenu = () => {
  const resetNotePositions = useChordChartStore((state) => state.resetNotePositions)

  return (
    <ul
      className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        divide-y divide-slate-500 overflow-auto
        rounded-lg border-2 border-slate-500 bg-white 
        text-xs
        shadow-lg
      `}
    >
      <li>
        <button
          onClick={resetNotePositions}
          className={` flex w-full items-center justify-start gap-1 p-1 text-slate-500 hover:bg-neutral-200`}
        >
          <RiDeleteBin2Line className='w-6  fill-slate-500' />
          <div>Reset</div>
        </button>
      </li>
    </ul>
  )
}

export const ExportButtonSubMenu = () => {
  const handleExport = () => {
    const exportRegion = document.getElementById('exportRegion')

    if (exportRegion === null) {
      return
    }
    console.log('export')

    toJpeg(exportRegion, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'chord-chart.jpg'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ul
      className={`
        mx-auto mb-2
        flex flex-col items-stretch justify-start
        divide-y divide-slate-500 overflow-auto
        rounded-lg border-2 border-slate-500 bg-white 
        text-xs
        shadow-lg
      `}
    >
      <li>
        <button
          onClick={handleExport}
          className={` flex w-full items-center justify-start gap-1 p-1 text-slate-500 hover:bg-neutral-200`}
        >
          <RiDownload2Fill className='w-6 fill-slate-500' />
          <div>Export</div>
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
       */}
    </ul>
  )
}

const ControlsMenu = () => {
  // const toggleChordLabel = useStore((state) => state.toggleChordLabel);

  return (
    <div>
      <SymbolSelectSubMenu />
      <FretMarketToggleSubMenu />
      <ResetButtonSubMenu />
      {/* <ExportButtonSubMenu /> */}
    </div>
  )
}

export default ControlsMenu
