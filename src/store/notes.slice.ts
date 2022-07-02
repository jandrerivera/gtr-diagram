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

export type NotesSlice = {
  notePositions: NoteType[];
  setNotePosition: (note: NoteType) => NoteId;
  getNoteAtPosition: (pos: GridPosKey) => NoteType | undefined;
  unsetNotePosition: (pos: GridPosKey) => void;
  unsetChildNotes: (parentId: NoteId) => void;
  resetNotePositions: () => void;
  setBarrePosition: (note: NoteType) => void;
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: [],
  resetNotePositions: () =>
    set((state) => ({ ...state, notePositions: [] }), false, 'NOTES/RESET_NOTE_POSITIONS'),
  setNotePosition: (note) => {
    let { id } = note;

    if (id) {
      set(
        (state) => ({
          ...state,
          notePositions: [...state.notePositions].map((old) => (old.id === id ? note : old)),
        }),
        false,
        'NOTES/UPDATE_NOTE_POSITION'
      );
    } else {
      id = uuidv4();
      set(
        (state) => ({
          ...state,
          notePositions: [...state.notePositions, { ...note, id }],
        }),
        false,
        'NOTES/SET_NOTE_POSITION'
      );
    }

    return id;
  },
  unsetNotePosition: (pos) => {
    return set(
      (state) => {
        const id = [...state.notePositions].find((note) => note.pos === pos)?.id;
        return {
          notePositions: [...state.notePositions].filter(
            (note) => note.pos !== pos && note.childOf !== id
          ),
        };
      },
      false,
      'NOTES/UNSET_NOTE_POSITION'
    );
  },
  unsetChildNotes: (parentId) => {
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
    const unsetChildNotes = get().unsetChildNotes;
    const getGridCoord = get().getGridCoord;

    let { span } = symbol;

    if (span === undefined) {
      const { stringsCount } = get().config;
      span = stringsCount - string + 1;
    }

    const setId = setNotePosition({
      ...getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    });

    //Reset all child notes
    unsetChildNotes(setId);

    // Replace notes under barre with spacer child notes
    for (let i = 1; i < span; i++) {
      // get().unsetNotePosition(get().getPos(fret, string + i));
      const note = get().getNoteAtPosition(get().getPos(fret, string + i));

      setNotePosition({
        ...getGridCoord(fret, string + i),
        id: note?.id,
        childOf: setId,
        symbol: { ...symbol, style: NoteSymbols.blank },
      });
    }
  },
});
