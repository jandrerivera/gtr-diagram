import { useState, useEffect } from 'react';
import useStore from '../../store/store';
import useMeasure, { RectReadOnly } from 'react-use-measure';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { CgArrowsH } from 'react-icons/cg';

const BarreDragControl = ({
  parentBounds,
  setBarreHandler,
}: {
  parentBounds: RectReadOnly;
  setBarreHandler: (span: number) => void;
}) => {
  const dragAreaRef = useStore((state) => state.dragAreaRef);
  const [barreControlRef, barreControlBounds] = useMeasure();
  const startingWidth = barreControlBounds.height / 2;

  const [{ width, opacity, x }, api] = useSpring(
    () => ({
      from: { width: startingWidth, opacity: 0, immediate: true, x: 0 },
      to: { width: startingWidth, opacity: 1, x: 0 },
    }),
    [startingWidth]
  );

  const bind = useDrag(
    ({ movement: [mx], dragging, last }) => {
      // if (startingWidth + mx < 0) {
      //   //write this
      //   console.log('wrong way!');

      //   if (dragging) api.start({ to: { x: mx, opacity: 1 } });
      //   if (!dragging) api.start({ to: { x: 0 } });
      // }

      if (dragging) api.start({ to: { width: startingWidth + mx, opacity: 1 } });
      if (!dragging) api.start({ to: { width: startingWidth } });
      if (last) {
        const span = Math.round(mx / parentBounds.width) + 1;
        if (span <= 1) return;
        setBarreHandler(span);
      }
    },
    {
      delay: true,
      bounds: dragAreaRef,
    }
  );

  return (
    <animated.div
      // style={{ x }}
      className={`
          absolute inset-0
          flex justify-center items-center 
        `}
    >
      <animated.div
        ref={barreControlRef}
        {...bind()}
        style={{ width, opacity }}
        className={`
          absolute z-50
          h-3/5 left-1/2
          rounded-r-full
          flex justify-center items-center text-2xl font-bold text-white
          touch-pan-y
          bg-slate-700
        `}
      >
        <div
          className={`
            absolute right-0 translate-x-1/2
            bg-pink-400 p-1 rounded-full w-6
          `}
        >
          <CgArrowsH className='w-full h-auto' />
        </div>
      </animated.div>
    </animated.div>
  );
};

export default BarreDragControl;
