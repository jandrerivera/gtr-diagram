import { useState } from 'react'
import useMeasure from 'react-use-measure'
import useChordChartStore from '../../store/chordChart/chordChart.store'
import { BarreType } from '../../store/chordChart/slices/notes.slice'

import { useSpring, animated } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { CgArrowsH } from 'react-icons/cg'
import { RiDeleteBin2Fill } from 'react-icons/ri'

export type BarreSymbolComponent = {
  note: BarreType
  outline?: boolean
  label?: String
  dragAreaRef?: React.RefObject<HTMLDivElement>
}

const Barre = ({ note, outline = false, label, dragAreaRef }: BarreSymbolComponent) => {
  const {
    symbol: { span },
  } = note

  const VISUAL_ADJUST = 3.1 //visually adjusted to same width as Circle

  const MAX_BARRE_WIDTH = `${((span - 1 / VISUAL_ADJUST) / span) * 100}%`

  const updateBarreSize = useChordChartStore((state) => state.updateBarreSize)
  const getMaxSpanFromString = useChordChartStore((state) => state.getMaxSpanFromString)
  const unsetNotePosition = useChordChartStore((state) => state.unsetNotePosition)

  const [showResizeControls, setShowResizeControls] = useState(false)
  const [showDeleteControls, setShowDeleteControls] = useState(false)
  const [wrapRef, wrapBounds] = useMeasure()
  const [ballRef, ballBounds] = useMeasure()
  const [barreParentRef, parentBounds] = useMeasure()

  const maxSpanPossible = getMaxSpanFromString(note.string)

  const [{ width, opacity }, api] = useSpring(() => {
    const STARTING_SIZE =
      parentBounds.width < ballBounds.width ? ballBounds.width : parentBounds.width

    return {
      from: { width: STARTING_SIZE || '100%', opacity: 0 },
      to: { width: STARTING_SIZE || '100%' },
    }
  }, [parentBounds, ballBounds])

  const bind = useDrag(
    ({ movement: [mx], dragging, last }) => {
      if (dragging) api.start({ to: { width: parentBounds.width + mx } })
      if (!last) return

      hideAllControls()

      if (!note || span < 2) return

      const gridSpanSize = wrapBounds.width / span
      const newSpan = Math.round(span - -mx / gridSpanSize)

      updateBarreSize({
        ...note,
        symbol: {
          style: note.symbol.style,
          span: newSpan,
        },
      })

      if (span === newSpan) api.start({ to: { width: parentBounds.width } })
    },
    { bounds: dragAreaRef }
  )

  const toggleBarreControls = () => {
    if (showResizeControls) return hideAllControls()

    api.start({ to: { opacity: 1 } })
    setShowDeleteControls(true)

    if (maxSpanPossible <= 2) return

    setShowResizeControls(true)
  }

  const hideAllControls = () =>
    api.start({
      to: { opacity: 0 },
      onRest: () => {
        setShowResizeControls(false)
        setShowDeleteControls(false)
      },
    })

  const clickToDelete = () => {
    if (!showDeleteControls) return
    unsetNotePosition(note.pos)
  }

  return (
    <>
      <div ref={wrapRef} className='relative z-50 flex h-full w-full items-center justify-center'>
        <div
          ref={barreParentRef}
          style={{ width: MAX_BARRE_WIDTH }}
          className={` relative h-[66%] w-full `}
        >
          <div
            ref={ballRef}
            className={`
              group
              absolute inset-0 z-30 flex aspect-square
              h-full items-center justify-center
              ${!showDeleteControls && 'pointer-events-none'}
              ${outline ? 'text-slate-700' : ' text-white'}
            `}
            onClick={clickToDelete}
          >
            {showDeleteControls && (
              <animated.div style={{ opacity }}>
                <BarreDeleteIcon outline={outline} />
              </animated.div>
            )}
            {label}
          </div>

          <animated.div
            className={`
            absolute z-20 h-full
            rounded-full
            border-4 border-slate-700 text-white
            ${outline ? 'bg-white' : 'bg-slate-700'}
          `}
            style={{ width }}
            onClick={toggleBarreControls}
          >
            {showResizeControls && (
              <animated.div
                {...bind()}
                style={{ opacity }}
                className={`
                  group
                  absolute right-0 z-50
                  flex aspect-square
                  h-full cursor-col-resize touch-pan-y
                  items-center justify-center 
                `}
              >
                <BarreResizeIcon />
              </animated.div>
            )}
          </animated.div>
        </div>
      </div>
    </>
  )
}

const BarreDeleteIcon = ({ outline }: { outline: boolean }) => {
  return (
    <div
      className={`
        flex h-7 w-7 items-center
        justify-center rounded-full p-1 md:h-6 md:w-6 md:p-0
        ${outline ? ' bg-white' : 'bg-slate-700'}
        `}
    >
      <RiDeleteBin2Fill
        className={`
          h-auto
          w-full transition-colors
          ${
            outline
              ? 'fill-slate-700 group-hover:fill-red-500'
              : 'fill-neutral-200 group-hover:fill-red-300'
          }
        `}
      />
    </div>
  )
}

const BarreResizeIcon = () => {
  return (
    <div
      className={`
          absolute right-0 flex
          h-full translate-x-1/2 items-center
          justify-center 
        `}
    >
      <div
        className={`
        h-7 w-7
        rounded-full bg-pink-600
        p-1 transition-colors group-hover:bg-pink-400`}
      >
        <CgArrowsH className='h-auto w-full' />
      </div>
    </div>
  )
}

export default Barre
