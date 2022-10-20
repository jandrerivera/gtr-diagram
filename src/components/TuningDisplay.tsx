import useChordChartStore from '../store/chordChart/chordChart.store'
import { buildLabelGridTemplateRow } from '../utils/cssGridGenerator'

const tuningAreaName = 'tuning'

const TuningDisplay = () => {
  const { tuning, stringsCount } = useChordChartStore((state) => state.config)

  const gridTemplateColumns = `2fr repeat(${stringsCount * 2}, minmax(0, 1fr)) 2fr`
  const gridTemplateRows = `1fr`
  const gridTemplateAreas = `'${buildLabelGridTemplateRow(tuningAreaName, stringsCount, 1)}'`

  return (
    <div
      className='tuning-display--wrapper grid w-full gap-1'
      style={{
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
      }}
    >
      <ul
        className='flex flex-row justify-around'
        style={{
          gridArea: `${tuningAreaName}`,
        }}
      >
        {tuning.map((note, key) => (
          <li
            key={key}
            className={`
              text-center text-3xl font-bold text-slate-500
            `}
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TuningDisplay
