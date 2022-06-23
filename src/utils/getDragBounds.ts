import { RectReadOnly } from 'react-use-measure';
import { useState, useEffect } from 'react';
import useStore from '../store/store';

export const getDragBounds = (parentBounds: RectReadOnly) => {
  const GRID_GAP = 4 / 2; //Fix later: add to store
  const fretboardBounds = useStore((state) => state.fretboardBounds);

  const [dragBounds, setDragBounds] = useState({ right: 0, left: 0 });

  useEffect(() => {
    if (!fretboardBounds) return;
    const parentBoundsLeftOfCenter = parentBounds.left + parentBounds.width / 2;
    const toRightEdgeOfFretboard = parentBoundsLeftOfCenter - fretboardBounds.left - GRID_GAP;
    const right = fretboardBounds.width - toRightEdgeOfFretboard;
    // const right = fretboardBounds.right - fretboardBounds.left;

    // const parentBoundsRightOfCenter = parentBounds.right + parentBounds.width / 2;
    // const toLeftEdgeOfFretboard = parentBoundsLeftOfCenter - fretboardBounds.right - GRID_GAP;
    // const left = fretboardBounds.width - toLeftEdgeOfFretboard;
    // const left = parentBoundsRightOfCenter;

    const left = fretboardBounds.left - parentBoundsLeftOfCenter;

    console.log({ right, left });
    setDragBounds({ right, left });
  }, [fretboardBounds]);

  return dragBounds;
};
