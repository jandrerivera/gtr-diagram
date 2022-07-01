import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import type { GridPosKey, CssArea, GridCoordinateType } from './grid.slice';
import { getPos, getCssArea } from '../utils/grid';

export enum NoteSymbols {
  default = 'DEFAULT',
  circle = 'CIRCLE',
  square = 'SQUARE',
  triangle = 'TRIANGLE',
  diamond = 'DIAMOND',
  cross = 'CROSS',
  barre = 'BARRE',
  circleOutline = 'CIRCLE_OUTLINE',
  squareOutline = 'SQUARE_OUTLINE',
  triangleOutline = 'TRIANGLE_OUTLINE',
  diamondOutline = 'DIAMOND_OUTLINE',
  crossOutline = 'CROSS_OUTLINE',
  barreOutline = 'BARRE_OUTLINE',
}

export type SymbolType = { style: NoteSymbols; label?: string; span?: number };

export type NoteType = GridCoordinateType & {
  symbol: SymbolType;
};

export type NotesSlice = {
  notePositions: {
    [pos: GridPosKey]: NoteType;
  };
  getPosHasNote: (pos: GridPosKey) => boolean;
  getNotePositionsArr: () => NoteType[];
  setNotePosition: (note: NoteType) => void;
  unsetNotePosition: (pos: GridPosKey) => void;
  getNoteAtPosition: (pos: GridPosKey) => NoteType;
  resetNotePositions: () => void;
  setBarrePosition: (note: NoteType) => void;
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: {},
  resetNotePositions: () =>
    set((state) => ({ ...state, notePositions: {} }), false, 'NOTES/RESET_NOTE_POSITIONS'),
  getPosHasNote: (pos) => {
    const notePositions = get().notePositions;
    return pos in notePositions;
  },
  getNotePositionsArr: () => Object.values(get().notePositions),
  getNoteAtPosition: (pos) => get().notePositions[pos],
  setNotePosition: ({ pos, cssArea, fret, string, symbol }) => {
    return set(
      (state) => {
        const newState = { ...state.notePositions };
        newState[pos] = { pos, cssArea, fret, string, symbol };
        return { notePositions: newState };
      },
      false,
      'NOTES/SET_NOTE_POSITION'
    );
  },
  unsetNotePosition: (pos) => {
    set(
      (state) => {
        const newState = { ...state.notePositions };
        delete newState[pos];

        return { notePositions: newState };
      },
      false,
      'NOTES/UNSET_NOTE_POSITION'
    );
  },
  setBarrePosition: ({ fret, string, symbol }) => {
    const getGridCoord = get().getGridCoord;

    let { span } = symbol;

    if (span === undefined) {
      const { stringsCount } = get().config;
      span = stringsCount - string + 1;
    }

    get().setNotePosition({
      ...getGridCoord(fret, string, span),
      symbol: { ...symbol, span },
    });

    // Remove any notes under Barre
    for (let i = 1; i < span; i++) {
      get().unsetNotePosition(getPos(fret, string + i, get().config));
    }
  },
});
