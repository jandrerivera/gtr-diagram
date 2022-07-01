import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';

import { getPos, getCssArea } from '../utils/grid';

export type GridPosKey = string;
export type CssArea = string;

export type GridCoordinateType = {
  pos: GridPosKey;
  cssArea: CssArea;
  fret: number;
  string: number;
};

export type GridSlice = {
  gridCoordinates: GridCoordinateType[];
  getGridCoord: (fret: number, string: number, span?: number) => GridCoordinateType;
  _generateCoordinateGrid: () => void;
  _movePos: (pos: GridPosKey, dir: 'left' | 'right', distance: number) => GridPosKey;
};

export const createGridSlice: StateCreator<State, Middlewares, [], GridSlice> = (set, get) => ({
  gridCoordinates: [{ pos: '0', cssArea: 'posA0', fret: 0, string: 1 }],
  getGridCoord: (fret, string, span = 1) => {
    const config = get().config;
    return {
      pos: getPos(fret, string, config),
      cssArea: getCssArea(fret, string, span),
      fret,
      string,
    };
  },
  _generateCoordinateGrid: () => {
    let coords = [];
    const { fretsCount, stringsCount } = get().config;
    for (let i = 1; i <= stringsCount; i++) {
      let string = i;
      for (let j = 0; j <= fretsCount; j++) {
        let fret = j;
        let pos = getPos(fret, string, get().config);
        let cssArea = getCssArea(fret, string);
        coords.push({ pos, cssArea, fret, string });
      }
    }
    set({ gridCoordinates: coords }, false, 'GRID/GENERATE_COORDINATE_GRID');
  },
  _movePos: (pos, dir, distance) => {
    const { fretsCount } = get().config;
    const posNum = parseInt(pos);
    if (dir === 'left') return `${posNum - (fretsCount + 1) * distance}`;
    // if (dir === 'right') {
    return `${posNum + (fretsCount + 1) * distance}`;
    // }
  },
});
