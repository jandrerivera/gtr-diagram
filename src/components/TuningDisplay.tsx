<<<<<<< HEAD
import useChordChartStore from '../store/chordChart/chordChart.store'
=======
import useStore from '../store/store'
>>>>>>> main
import { buildLabelGridTemplateRow } from '../utils/cssGridGenerator'

const tuningAreaName = 'tuning'

const TuningDisplay = () => {
<<<<<<< HEAD
  const { tuning } = useChordChartStore((state) => state.config)

  const { stringsCount } = useChordChartStore((state) => state.config)
=======
  const { tuning } = useStore((state) => state.config)

  const { stringsCount } = useStore((state) => state.config)
>>>>>>> main

  const gridTemplateColumns = `2fr repeat(${stringsCount * 2}, minmax(0, 1fr)) 2fr`
  const gridTemplateRows = `1fr`
  const gridTemplateAreas = `'${buildLabelGridTemplateRow(tuningAreaName, stringsCount, 1)}'`
<<<<<<< HEAD
=======

  console.log(gridTemplateAreas)
>>>>>>> main

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
              text-center text-[4vw] font-bold text-slate-500 md:text-2xl
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
