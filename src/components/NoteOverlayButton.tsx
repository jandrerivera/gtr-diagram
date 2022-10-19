import { useState } from 'react'
import type { GridCoordinateType } from '../store/chordChart/grid.slice'
import { NoteSymbols, NoteSymbolsType } from '../store/chordChart/notes.slice'
import useControlsStore from '../store/controls.store'
import useChordChartStore from '../store/chordChart/chordChart.store'

const isBarre = (symbol?: NoteSymbolsType): boolean => {
  if (!symbol) return false
  return symbol.includes('BARRE')
}

const NoteOverlayButton = ({ gridCoord }: { gridCoord: GridCoordinateType }) => {
  const { pos, fret, string } = gridCoord

  const [showPreview, setShowPreview] = useState(false)

  const selectedControl = useControlsStore((state) => state.selectedControl)

  const { stringsCount } = useChordChartStore((state) => state.config)
  const note = useChordChartStore((state) => state.getNoteAtPosition(pos))
  const maxBarreSpan = useChordChartStore((state) => state.getMaxSpanFromString(string))

  const setBarrePosition = useChordChartStore((state) => state.setBarrePosition)
  const setNotePosition = useChordChartStore((state) => state.setNotePosition)
  const unsetNotePosition = useChordChartStore((state) => state.unsetNotePosition)
  const getCssArea = useChordChartStore((state) => state.getCssArea)

  const previewSpan = isBarre(selectedControl) ? maxBarreSpan : 1
  const buttonSpan = isBarre(selectedControl) && string === stringsCount - 1 ? 2 : 1

  const handleClick = () => {
    if (isBarre(selectedControl)) {
      setShowPreview(false)
      return setBarrePosition({
        ...gridCoord,
        symbol: { style: selectedControl, span: maxBarreSpan },
      })
    }

    if (note && note.symbol.style === selectedControl) return unsetNotePosition(pos)

    setShowPreview(false)
    return setNotePosition({ ...gridCoord, symbol: { style: selectedControl } })
  }

  const handleHover = (bool: boolean) => {
    if (note?.symbol.style !== selectedControl) return setShowPreview(bool)
  }

  // Remove self if dummy note
  if (note?.symbol?.style === NoteSymbols.blank) return <></>

  //Remove self if is unusable when Barre is selected
  if (isBarre(selectedControl) && string === stringsCount) return <></>

  return (
    <>
      <button
        className={`
          group
          relative z-50
          transition-colors
          ${isBarre(note?.symbol.style) && 'pointer-events-none'}
        `}
        // bg-lime-400 bg-opacity-30
        style={{ gridArea: getCssArea(fret, string, buttonSpan) }}
        onClick={handleClick}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      />
      <div
        className={`
        relative z-10
        m-2 rounded-lg
        bg-emerald-300
        transition-opacity
        ${showPreview ? 'opacity-40' : 'opacity-0'}
        `}
        style={{ gridArea: getCssArea(fret, string, previewSpan) }}
      />
    </>
  )
}

export default NoteOverlayButton
