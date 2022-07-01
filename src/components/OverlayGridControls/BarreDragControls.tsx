import { useState, useEffect } from 'react';
import useStore from '../../store/store';
import useMeasure, { RectReadOnly } from 'react-use-measure';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { CgArrowsH } from 'react-icons/cg';

// const BarreDragControl = ({
//   parentBounds,
//   setBarreHandler,
// }: {
//   parentBounds: RectReadOnly;
//   setBarreHandler: (span: number) => void;
// }) => {
const BarreDragControl = () => {
  const dragAreaRef = useStore((state) => state.dragAreaRef);
  // const [barreControlRef, barreControlBounds] = useMeasure();
  // const startingWidth = barreControlBounds.height / 2;

  const [{ width, opacity, x }, api] = useSpring(
    () => ({
      from: { x: 0, opacity: 0, immediate: true, x: 0 },
      to: { x: 0, opacity: 1, x: 0 },
    })
    // ,
    // [startingWidth]
  );

  const bind = useDrag(
    ({ movement: [mx], dragging, last }) => {
      // if (startingWidth + mx < 0) {
      //   //write this
      //   console.log('wrong way!');

      //   if (dragging) api.start({ to: { x: mx, opacity: 1 } });
      //   if (!dragging) api.start({ to: { x: 0 } });
      // }

      if (dragging) api.start({ to: { x: mx, opacity: 1 } });
      if (!dragging) api.start({ to: { x: 0 } });
      // if (last) {
      //   const span = Math.round(mx / parentBounds.width) + 1;
      //   if (span <= 1) return;
      //   setBarreHandler(span);
      // }
    },
    {
      delay: true,
      bounds: dragAreaRef,
    }
  );

  return (
    <animated.div
      // ref={barreControlRef}
      {...bind()}
      style={{ x, opacity }}
      className={`
          absolute z-50
          h-full aspect-[2/3] right-0
          flex justify-center items-center text-2xl font-bold text-white
          touch-pan-y
          bg-purple-700 opacity-50
        `}
    >
      <div
        className={`
            bg-pink-400 p-1 rounded-full w-6
          `}
      >
        <CgArrowsH className='w-full h-auto' />
      </div>
    </animated.div>
  );
};

export default BarreDragControl;
