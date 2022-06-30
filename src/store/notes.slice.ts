import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import type { GridPosKey, CssArea, GridCoordinateType } from './grid.slice';

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
  // setBarrePosition: (startPos: GridCoordinateType, span: number) => void;
  // _moveToBarreStart: (currentPos: string) => NoteType | undefined;
  // _adjustForExistingBarreAtStart: (
  //   startCoord: GridCoordinateType,
  //   span: number
  // ) => { pos: GridPosKey; string: number; span: number };
};

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: {},
  resetNotePositions: () => set((state) => ({ ...state, notePositions: {} })),
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
  // setBarrePosition: (startCoord, span) => {
  //   const { stringsCount } = get().config;
  //   const getGridCoord = get().getGridCoord;
  //   const setNotePosition = get().setNotePosition;
  //   const posHasNote = get().posHasNote;
  //   const getNoteAtPosition = get().getNoteAtPosition;
  //   const _movePos = get()._movePos;
  //   const _adjustForExistingBarreAtStart = get()._adjustForExistingBarreAtStart;
  //   let { pos, fret, string } = startCoord;
  //   // Is startCoord part of an existing barre?
  //   if (posHasNote(pos)) {
  //     const adjustedFretAndSpan = _adjustForExistingBarreAtStart(startCoord, span);
  //     pos = adjustedFretAndSpan.pos;
  //     string = adjustedFretAndSpan.string;
  //     span = adjustedFretAndSpan.span;
  //   }
  //   // Is new barre ending over an existing barre?
  //   const endPos = _movePos(pos, 'right', span - 1);
  //   if (posHasNote(endPos)) {
  //     //If so, add it's span length to the new barre
  //     const { span: overLappingNoteSpan } = getNoteAtPosition(endPos);
  //     span += overLappingNoteSpan - 1;
  //   }
  //   // Check of span is too long
  //   span = span > stringsCount ? stringsCount : span;
  //   //Set Bar Start
  //   setNotePosition({ ...getGridCoord(fret, string, span), span, style: 'BARRE_START' });
  //   // Set Barre Dummy Notes replacing any existing notes
  //   for (let i = 1; i < span; i++) {
  //     let style = i === span - 1 ? 'BARRE_END' : 'BARRE_DUMMY';
  //     setNotePosition({
  //       ...getGridCoord(fret, string + i),
  //       span: span - i, // each "node" of the barre should tell you how much span is left...
  //       style,
  //     });
  //   }
  // },
  // _moveToBarreStart: (currentPos: string): NoteType | undefined => {
  //   if (parseInt(currentPos) < 0) return undefined;
  //   const cursor = get()._movePos(currentPos, 'left', 1);
  //   const noteAtCursor = get().getNoteAtPosition(cursor);
  //   if (noteAtCursor.style === 'BARRE_START') return noteAtCursor;
  //   return get()._moveToBarreStart(cursor);
  // },
  // _adjustForExistingBarreAtStart: ({ pos, string }, span) => {
  //   const existingBarreAtPos = get().getNoteAtPosition(pos);
  //   if (existingBarreAtPos.style === 'BARRE_END' || existingBarreAtPos.style === 'BARRE_DUMMY') {
  //     const existingBarreStart = get()._moveToBarreStart(pos);
  //     if (existingBarreStart)
  //       return {
  //         pos: existingBarreStart.pos,
  //         string: existingBarreStart.string,
  //         span: existingBarreStart.span - existingBarreAtPos.span + span,
  //       };
  //   }
  //   return { pos, string, span };
  // },
});
