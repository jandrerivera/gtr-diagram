import { useState } from 'react';
import useMeasure from 'react-use-measure';
import useStore from '../../store/store';
import { BarreType } from '../../store/notes.slice';

import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { CgArrowsH } from 'react-icons/cg';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export type BarreSymbolComponent = {
  note: BarreType;
  outline?: boolean;
  label?: String;
  dragAreaRef?: React.RefObject<HTMLDivElement>;
};

const BarreSquare = ({ note, outline = false, label, dragAreaRef }: BarreSymbolComponent) => {
  const {
    symbol: { span },
  } = note;

  const VISUAL_ADJUST = 2.8; //visually adjusted to same width as Square
  const MAX_BARRE_WIDTH = `${((span - 1 / VISUAL_ADJUST) / span) * 100}%`;

  const updateBarreSize = useStore((state) => state.updateBarreSize);
  const getMaxSpanFromString = useStore((state) => state.getMaxSpanFromString);
  const unsetNotePosition = useStore((state) => state.unsetNotePosition);

  const [showResizeControls, setShowResizeControls] = useState(false);
  const [showDeleteControls, setShowDeleteControls] = useState(false);
  const [wrapRef, wrapBounds] = useMeasure();
  const [ballRef, ballBounds] = useMeasure();
  const [barreParentRef, parentBounds] = useMeasure();

  const maxSpanPossible = getMaxSpanFromString(note.string);

  const [{ width, opacity }, api] = useSpring(() => {
    const STARTING_SIZE =
      parentBounds.width < ballBounds.width ? ballBounds.width : parentBounds.width;

    return {
      from: { width: STARTING_SIZE || '100%', opacity: 0 },
      to: { width: STARTING_SIZE || '100%' },
    };
  }, [parentBounds, ballBounds]);

  const bind = useDrag(
    ({ movement: [mx], dragging, last }) => {
      if (dragging) api.start({ to: { width: parentBounds.width + mx } });
      if (!last) return;

      hideAllControls();

      if (!note || span < 2) return;

      const gridSpanSize = wrapBounds.width / span;
      const newSpan = Math.round(span - -mx / gridSpanSize);

      updateBarreSize({
        ...note,
        symbol: {
          style: note.symbol.style,
          span: newSpan,
        },
      });

      if (span === newSpan) api.start({ to: { width: parentBounds.width } });
    },
    { bounds: dragAreaRef }
  );

  const toggleBarreControls = () => {
    if (showResizeControls) return hideAllControls();

    api.start({ to: { opacity: 1 } });
    setShowDeleteControls(true);

    if (maxSpanPossible <= 2) return;

    setShowResizeControls(true);
  };

  const hideAllControls = () =>
    api.start({
      to: { opacity: 0 },
      onRest: () => {
        setShowResizeControls(false);
        setShowDeleteControls(false);
      },
    });

  const clickToDelete = () => {
    if (!showDeleteControls) return;
    unsetNotePosition(note.pos);
  };

  return (
    <>
      <div ref={wrapRef} className='relative z-50 flex justify-center items-center w-full h-full'>
        <div
          ref={barreParentRef}
          style={{ width: MAX_BARRE_WIDTH }}
          className={` h-[66%] w-full relative `}
        >
          <div
            ref={ballRef}
            className={`
              group
              absolute z-30 inset-0 h-full aspect-square
              flex justify-center items-center text-2xl font-bold 
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
            text-2xl font-bold text-white
            border-4 border-slate-700 
            ${outline ? 'bg-white text-bg-slate-700' : 'bg-slate-700 text-white'}
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
                  absolute z-50 right-0
                  h-full aspect-square
                  flex justify-center items-center
                  touch-pan-y cursor-col-resize 
                  bg-lime-500
                `}
              >
                <BarreResizeIcon />
              </animated.div>
            )}
          </animated.div>
        </div>
      </div>
    </>
  );
};

const BarreDeleteIcon = ({ outline }: { outline: boolean }) => {
  return (
    <div
      className={`
        absolute inset-4 flex justify-center items-center rounded-full
        ${outline ? ' bg-white' : 'bg-slate-700'}
        `}
    >
      <RiDeleteBin2Fill
        className={`
          w-6 h-6 transition-colors
          ${
            outline
              ? 'group-hover:fill-red-500 fill-slate-700'
              : 'group-hover:fill-red-300 fill-neutral-200'
          }
        `}
      />
    </div>
  );
};

const BarreResizeIcon = () => {
  return (
    <div
      className={`
          absolute right-0 translate-x-[60%]
          flex justify-center items-center
          w-6 h-full 
        `}
    >
      <div
        className={`group-hover:bg-pink-400 bg-pink-600 transition-colors p-1 w-6 h-6 rounded-full`}
      >
        <CgArrowsH className='w-full h-auto' />
      </div>
    </div>
  );
};

export default BarreSquare;
