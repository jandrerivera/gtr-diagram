import NoteOverlayButton from './NoteOverlayButton'
import NoteOverlaySymbolCell from './NoteOverlaySymbolCell'
import Fretboard from './GuitarParts/Fretboard'
import Nut from './GuitarParts/Nut'
import useChordChartStore from '../store/chordChart/chordChart.store'
import { buildGridTemplate } from '../utils/cssGridGenerator'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import classNames from 'classnames'

const NoteOverlayGrid = () => {
  const { stringsCount, fretsCount } = useChordChartStore((state) => state.config)
  const gridCoordinates = useChordChartStore((state) => state.gridCoordinates)
  const notePositions = useChordChartStore((state) => state.notePositions)

  const gridTemplateColumns = `2fr repeat(${stringsCount * 2}, minmax(0, 1fr)) 2fr`
  const gridTemplateRows = `minmax(0, 4fr) 1fr repeat(${fretsCount}, minmax(0, 4fr)) 1fr`
  const gridTemplateAreas = buildGridTemplate(fretsCount, stringsCount)

  const fretMarkerEnabled = useChordChartStore((state) => state.fretMarker.enabled)

  return (
    <div
      className={`
        max-w-1xl relative aspect-[20/16] w-full
      `}
    >
      <div
        className='note-overlay-grid gap- absolute inset-0 z-10 grid gap-1'
        style={{
          gridTemplateColumns,
          gridTemplateRows,
          gridTemplateAreas,
        }}
      >
        <Nut />
        <Fretboard strings={stringsCount} frets={fretsCount} />

        {fretMarkerEnabled && <FretMarker />}

        {gridCoordinates.map((gridCoord, key) => (
          <NoteOverlayButton key={key} gridCoord={gridCoord} />
        ))}

        {notePositions.map((note) => (
          <NoteOverlaySymbolCell key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

export default NoteOverlayGrid

export const FretMarker = () => {
  const ref = useRef(null)
  const [showControls, setShowControls] = useState(false)

  const { fretsCount } = useChordChartStore((state) => state.config)
  const { pos, label } = useChordChartStore((state) => state.fretMarker)
  const shiftFretMarker = useChordChartStore((state) => state.shiftFretMarker)
  const changeFretLabel = useChordChartStore((state) => state.changeFretLabel)

  const toggleControls = () => setShowControls((state) => !state)
  useOnClickOutside(ref, () => setShowControls(false))

  return (
    <div
      ref={ref}
      style={{ gridArea: `fret${pos}` }}
      className={classNames('-m-2 grid cursor-pointer grid-cols-3 grid-rows-3 rounded-xl p-1', {
        'bg-slate-100': showControls,
      })}
    >
      <div
        className={classNames(
          `flex h-full w-full items-center justify-center
          text-center text-3xl font-bold leading-[.85] text-slate-500
          transition-transform duration-300
          `,
          {
            'translate-x-full': !showControls,
          }
        )}
        style={{ gridArea: '2 / 2' }}
        onClick={toggleControls}
      >
        <span>{label}</span>
      </div>

      {showControls && pos > 1 && (
        <div
          style={{ gridArea: '1 / 2' }}
          className={`
          p2 
          flex
          h-6 w-6
          items-center justify-center self-center justify-self-center
          rounded-full bg-slate-300 text-xl
          font-bold text-slate-500
          `}
          onClick={() => shiftFretMarker('up')}
        >
          &uarr;
        </div>
      )}
      {showControls && pos < fretsCount && (
        <div
          style={{ gridArea: '3 / 2' }}
          className={`
          p2 
          flex
          h-6
          w-6
          items-center justify-center self-center justify-self-center
          rounded-full bg-slate-300 text-xl
          font-bold text-slate-500
          `}
          onClick={() => shiftFretMarker('down')}
        >
          &darr;
        </div>
      )}
      {showControls && (
        <div
          style={{ gridArea: '2 / 3' }}
          className={`
          p2 
          flex
          h-6
          w-6
          items-center justify-center self-center justify-self-center
          rounded-full bg-slate-300 text-xl
          font-bold text-slate-500
          `}
          onClick={() => changeFretLabel('increase')}
        >
          +
        </div>
      )}
      {showControls && (
        <div
          style={{ gridArea: '2 / 1' }}
          className={`
          p2 
          flex
          h-6
          w-6
          items-center justify-center self-center justify-self-center
          rounded-full bg-slate-300 text-xl
          font-bold text-slate-500
          `}
          onClick={() => changeFretLabel('decrease')}
        >
          &minus;
        </div>
      )}
    </div>
  )
}
