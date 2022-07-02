import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import type { GridPosKey, CssArea, GridCoordinateType } from './grid.slice';
import { v4 as uuidv4 } from 'uuid';

export enum NoteSymbols {
  blank = 'BLANK',
  default = 'DEFAULT',
  circle = 'CIRCLE',
  square = 'SQUARE',
  triangle = 'TRIANGLE',
  diamond = 'DIAMOND',
  cross = 'CROSS',
  circleOutline = 'CIRCLE_OUTLINE',
  squareOutline = 'SQUARE_OUTLINE',
  triangleOutline = 'TRIANGLE_OUTLINE',
  diamondOutline = 'DIAMOND_OUTLINE',
  crossOutline = 'CROSS_OUTLINE',
  barre = 'BARRE',
  barreOutline = 'BARRE_OUTLINE',
  barreSuqare = 'BARRE_SQUARE',
  barreSuqareOutline = 'BARRE_SQUARE_OUTLINE',
}

export type SymbolType = { style: NoteSymbols; label?: string; span?: number };
type NoteId = string;

export type NoteType = GridCoordinateType & {
  id?: NoteId;
  childOf?: NoteId;
  symbol: SymbolType;
};

export type BarreType = GridCoordinateType & {
  id?: NoteId;
  symbol: SymbolType & { span: number };
};

export type NotesSlice = {
  notePositions: NoteType[];
  setNotePosition: (note: NoteType | BarreType) => NoteId;
  updateNotePosition: (note: NoteType | BarreType) => void;
  getNoteAtPosition: (pos: GridPosKey) => NoteType | undefined;
  unsetNotePosition: (pos: GridPosKey) => void;
  resetNotePositions: () => void;
  setBarrePosition: (note: BarreType) => void;
  updateBarreSize: (note: BarreType) => void;
  _unsetChildNotes: (parentId: NoteId) => void;
  _addSpacerNotes: (note: BarreType, id: NoteId) => void;
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: [],
  resetNotePositions: () =>
    set((state) => ({ ...state, notePositions: [] }), false, 'NOTES/RESET_NOTE_POSITIONS'),
  setNotePosition: (note) => {
    const id = uuidv4();

    set(
      (state) => {
        //Remove any notes in same Position
        let newState = [...state.notePositions].filter((old) => old.pos !== note.pos);

        return {
          ...state,
          notePositions: [...newState, { ...note, id }],
        };
      },
      false,
      'NOTES/SET_NOTE_POSITION'
    );

    return id;
  },
  updateNotePosition: (note) => {
    return set(
      (state) => {
        let newState = [...state.notePositions].map((old) => (old.id === note.id ? note : old));
        return {
          ...state,
          notePositions: newState,
        };
      },
      false,
      'NOTES/SET_NOTE_POSITION'
    );
  },
  unsetNotePosition: (pos) => {
    return set(
      (state) => {
        const id = [...state.notePositions].find((note) => note.pos === pos)?.id;
        return {
          notePositions: [...state.notePositions].filter(
            (note) => note.childOf !== id && note.pos !== pos
          ),
        };
      },
      false,
      'NOTES/UNSET_NOTE_POSITION'
    );
  },
  getNoteAtPosition(pos) {
    const note = get().notePositions.find((note) => note.pos === pos);
    return note;
  },
  setBarrePosition: ({ fret, string, symbol }) => {
    const { span = 2 } = symbol;
    const note = {
      ...get().getGridCoord(fret, string, span),
      symbol: { ...symbol, span },
    };

    const parentId = get().setNotePosition(note);

    // Replace notes under barre with spacer child notes
    get()._addSpacerNotes(note, parentId);
  },
  updateBarreSize: ({ id, fret, string, symbol }) => {
    const { span = 2 } = symbol;

    const note = {
      ...get().getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    };

    get().updateNotePosition(note);

    if (id) {
      //Reset all child notes
      get()._unsetChildNotes(id);

      // Replace notes under barre with spacer child notes
      get()._addSpacerNotes(note, id);
    }
  },
  _unsetChildNotes: (parentId) => {
    console.log('unsetChildNotes', parentId);
    return set(
      (state) => {
        return {
          notePositions: [...state.notePositions].filter((note) => note.childOf !== parentId),
        };
      },
      false,
      'NOTES/UNSET_CHILD_NOTES'
    );
  },
  _addSpacerNotes: ({ fret, string, symbol }, parentId) => {
    const { span } = symbol;

    for (let i = 1; i < span; i++) {
      get().setNotePosition({
        ...get().getGridCoord(fret, string + i),
        childOf: parentId,
        symbol: { ...symbol, style: NoteSymbols.blank },
      });
    }
  },
});
