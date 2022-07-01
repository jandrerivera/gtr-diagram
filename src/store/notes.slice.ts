import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import type { GridPosKey, CssArea, GridCoordinateType } from './grid.slice';
import { v4 as uuidv4 } from 'uuid';

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
  id?: string;
  symbol: SymbolType;
};

export type NotesSlice = {
  notePositions: NoteType[];
  setNotePosition: (note: NoteType) => void;
  unsetNotePosition: (pos: GridPosKey) => void;
  resetNotePositions: () => void;
  setBarrePosition: (note: NoteType) => void;
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: [],
  resetNotePositions: () =>
    set((state) => ({ ...state, notePositions: [] }), false, 'NOTES/RESET_NOTE_POSITIONS'),
  setNotePosition: (note) => {
    const { id } = note;
    return set(
      (state) => {
        let newState = [];
        if (id) {
          newState = state.notePositions.map((oldNote) => (oldNote.id === id ? note : oldNote));
        } else {
          newState = [...state.notePositions];
          newState.push({ ...note, id: uuidv4() });
        }
        return { notePositions: newState };
      },
      false,
      'NOTES/SET_NOTE_POSITION'
    );
  },

  unsetNotePosition: (pos) => {
    set(
      (state) => {
        const newState = [...state.notePositions].filter((note) => note.pos !== pos);
        // delete newState[pos];

        return { notePositions: newState };
      },
      false,
      'NOTES/UNSET_NOTE_POSITION'
    );
  },
  setBarrePosition: ({ id, fret, string, symbol }) => {
    const getGridCoord = get().getGridCoord;

    let { span } = symbol;

    if (span === undefined) {
      const { stringsCount } = get().config;
      span = stringsCount - string + 1;
    }

    get().setNotePosition({
      ...getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    });

    // Remove any notes under Barre
    for (let i = 1; i < span; i++) {
      get().unsetNotePosition(get().getPos(fret, string + i));
    }
  },
});
