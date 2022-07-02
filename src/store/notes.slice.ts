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
  barre = 'BARRE',
  circleOutline = 'CIRCLE_OUTLINE',
  squareOutline = 'SQUARE_OUTLINE',
  triangleOutline = 'TRIANGLE_OUTLINE',
  diamondOutline = 'DIAMOND_OUTLINE',
  crossOutline = 'CROSS_OUTLINE',
  barreOutline = 'BARRE_OUTLINE',
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
  unsetChildNotes: (parentId: NoteId) => void;
  resetNotePositions: () => void;
  setBarrePosition: (note: BarreType) => void;
  updateBarreSize: (note: BarreType) => void;
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: [],
  resetNotePositions: () =>
    set((state) => ({ ...state, notePositions: [] }), false, 'NOTES/RESET_NOTE_POSITIONS'),
  setNotePosition: (note) => {
    const id = uuidv4();

    set(
      (state) => {
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
    console.log(note.id);
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
  unsetChildNotes: (parentId) => {
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
  getNoteAtPosition(pos) {
    const note = get().notePositions.find((note) => note.pos === pos);
    return note;
  },
  setBarrePosition: ({ id, fret, string, symbol }) => {
    const setNotePosition = get().setNotePosition;
    const getGridCoord = get().getGridCoord;

    const { span = 2 } = symbol;

    const parentId = setNotePosition({
      ...getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    });

    // Replace notes under barre with spacer child notes
    for (let i = 1; i < span; i++) {
      setNotePosition({
        ...getGridCoord(fret, string + i),
        childOf: parentId,
        symbol: { ...symbol, style: NoteSymbols.blank },
      });
    }
  },
  updateBarreSize: ({ id, fret, string, symbol }) => {
    const setNotePosition = get().setNotePosition;
    const updateNotePosition = get().updateNotePosition;
    const unsetChildNotes = get().unsetChildNotes;
    const getGridCoord = get().getGridCoord;

    const { span = 2 } = symbol;

    updateNotePosition({
      ...getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    });

    //Reset all child notes
    if (id) unsetChildNotes(id);

    // Replace notes under barre with spacer child notes
    for (let i = 1; i < span; i++) {
      setNotePosition({
        ...getGridCoord(fret, string + i),
        childOf: id,
        symbol: { ...symbol, style: NoteSymbols.blank },
      });
    }
  },
});
