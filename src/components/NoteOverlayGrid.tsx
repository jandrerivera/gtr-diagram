import NoteOverlayButton from './NoteOverlayButton'
import NoteOverlaySymbolCell from './NoteOverlaySymbolCell'
import Fretboard from './GuitarParts/Fretboard'
import Nut from './GuitarParts/Nut'
import useStore from '../store/store'
import { buildGridTemplate } from '../utils/cssGridGenerator'

const NoteOverlayGrid = () => {
  const { stringsCount, fretsCount } = useStore((state) => state.config)
  const gridCoordinates = useStore((state) => state.gridCoordinates)
  const notePositions = useStore((state) => state.notePositions)

  const gridTemplateColumns = `2fr repeat(${stringsCount * 2}, minmax(0, 1fr)) 2fr`
  const gridTemplateRows = `minmax(0, 4fr) 1fr repeat(${fretsCount}, minmax(0, 4fr)) 1fr`
  const gridTemplateAreas = buildGridTemplate(fretsCount, stringsCount)

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
