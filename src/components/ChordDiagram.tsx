import NoteOverlayGrid from './NoteOverlayGrid'
import ChordLabel from './ChordLabel'
import TuningDisplay from './TuningDisplay'
import useChordChartStore from '../store/chordChart/chordChart.store'

const ChordDiagram = () => {
  // const { enabled: chordLabelenabled } = useStore((state) => state.chordLabel);

  return (
    <div
      className={`
        mx-auto
        flex h-auto w-full
        max-w-2xl flex-col
        items-center justify-start
      `}
    >
      {/* {chordLabelenabled && <ChordLabel />} */}
      <TuningDisplay />
      <NoteOverlayGrid />
    </div>
  )
}
export default ChordDiagram
