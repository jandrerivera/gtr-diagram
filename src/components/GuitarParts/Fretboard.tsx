import useMeasure from 'react-use-measure'
import { useEffect, useRef } from 'react'
import useStore from '../../store/store'

import Strings from './Strings'
import Frets from './Frets'

type FretboardProps = {
  frets: number
  strings: number
}

const Fretboard: React.FC<FretboardProps> = ({ frets, strings }) => {
  const { stringsCount, fretsCount } = useStore((state) => state.config)

  return (
    <div
      style={{
        gridArea: `3 / 3 / -2 / -3`,
      }}
      className={`
          note-overlay__fretboard
          pointer-events-none
          relative z-0
          -mx-1 -mt-1 -mb-1
          flex flex-col
          justify-center overflow-hidden
          rounded-b-lg border-x-4 border-b-4
          border-slate-500 drop-shadow-2xl
        `}
    >
      <div className='relative z-0 grow'>
        <Strings strings={strings} />
        <Frets frets={frets} />
      </div>
    </div>
  )
}

export default Fretboard

// .note-overlay__fretboard {
//   grid-area: 3 / 3 / 9 / -3;
// }
