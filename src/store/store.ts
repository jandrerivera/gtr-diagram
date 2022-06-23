import create from 'zustand';
import { getPos, getCssArea } from '../utils/grid';
import produce from 'immer';
import { RectReadOnly } from 'react-use-measure';
import React from 'react';

export type GridPosKey = string;
export type CssArea = string;
export type GridCoordinateType = {
  pos: GridPosKey;
  cssArea: CssArea;
  fret: number;
  string: number;
};
export type NoteType = GridCoordinateType & { style: string; span: number };

interface GlobalStateType {
  config: {
    stringsCount: number;
    fretsCount: number;
    defaultChordLabel: string;
  };
  setConfig: (config: ConfigType) => void;

  dragAreaRef: React.RefObject<HTMLDivElement> | undefined;
  setDragAreaRef: (ref: React.RefObject<HTMLDivElement>) => void;

  tuning: string[];

  chordLabel: {
    enabled: boolean;
    typed: string;
    styled: string;
  };
  setChordLabel: (payload: string) => void;
  toggleChordLabel: () => void;

  gridCoordinates: GridCoordinateType[];
  getGridCoord: (fret: number, string: number, span?: number) => GridCoordinateType;
  _generateCoordinateGrid: () => void;
  _movePos: (pos: GridPosKey, dir: 'left' | 'right', distance: number) => GridPosKey;

  notePositions: {
    [pos: GridPosKey]: NoteType;
  };
  posHasNote: (pos: GridPosKey) => boolean;
  getNotePositionsArr: () => NoteType[];
  setNotePosition: (note: {
    pos: GridPosKey;
    cssArea: CssArea;
    fret: number;
    string: number;
    style: string;
    span?: number;
  }) => void;
  unsetNotePosition: (pos: GridPosKey) => void;
  getNoteAtPosition: (pos: GridPosKey) => NoteType;
  setBarrePosition: (startPos: GridCoordinateType, span: number) => void;
  _moveToBarreStart: (currentPos: string) => NoteType | undefined;
  _adjustForExistingBarreAtStart: (
    startCoord: GridCoordinateType,
    span: number
  ) => { pos: GridPosKey; string: number; span: number };
}

export type ConfigType = GlobalStateType['config'];

const useStore = create<GlobalStateType>((set, get) => ({
  config: {
    stringsCount: 0,
    fretsCount: 0,
    defaultChordLabel: '0',
  },
  setConfig: (config) => {
    set({ config });
    get()._generateCoordinateGrid();
    get().setChordLabel(config.defaultChordLabel);
  },

  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

  dragAreaRef: undefined,
  setDragAreaRef: (ref) => set({ dragAreaRef: ref }),

  chordLabel: {
    enabled: false,
    typed: '',
    styled: '',
  },
  setChordLabel: (payload) =>
    set(
      produce((state) => {
        state.chordLabel.typed = payload;
        state.chordLabel.styled = payload;
      })
    ),
  toggleChordLabel: () =>
    set(
      produce((state) => {
        state.chordLabel.enabled = !state.chordLabel.enabled;
      })
    ),

  notePositions: {},
  posHasNote: (pos) => {
    const notePositions = get().notePositions;
    return pos in notePositions;
  },
  getNotePositionsArr: () => Object.values(get().notePositions),
  getNoteAtPosition: (pos) => get().notePositions[pos],
  setNotePosition: ({ pos, cssArea, fret, string, style, span = 1 }) => {
    if (style === 'default') {
      style = fret === 0 ? 'CIRCLE' : 'BALL';
    }

    return set((state) => {
      const newState = { ...state.notePositions };
      newState[pos] = { pos, cssArea, fret, string, style, span };
      return { notePositions: newState };
    });
  },
  unsetNotePosition: (pos) => {
    set((state) => {
      const newState = { ...state.notePositions };
      delete newState[pos];
      return { notePositions: newState };
    });
  },

  setBarrePosition: (startCoord, span) => {
    const { stringsCount } = get().config;
    const getGridCoord = get().getGridCoord;
    const setNotePosition = get().setNotePosition;
    const posHasNote = get().posHasNote;
    const getNoteAtPosition = get().getNoteAtPosition;
    const _movePos = get()._movePos;
    const _adjustForExistingBarreAtStart = get()._adjustForExistingBarreAtStart;

    let { pos, fret, string } = startCoord;

    // Is startCoord part of an existing barre?
    if (posHasNote(pos)) {
      const adjustedFretAndSpan = _adjustForExistingBarreAtStart(startCoord, span);
      pos = adjustedFretAndSpan.pos;
      string = adjustedFretAndSpan.string;
      span = adjustedFretAndSpan.span;
    }

    // Is new barre ending over an existing barre?
    const endPos = _movePos(pos, 'right', span - 1);

    if (posHasNote(endPos)) {
      //If so, add it's span length to the new barre
      const { span: overLappingNoteSpan } = getNoteAtPosition(endPos);
      span += overLappingNoteSpan - 1;
    }
    // Check of span is too long
    span = span > stringsCount ? stringsCount : span;

    //Set Bar Start
    setNotePosition({ ...getGridCoord(fret, string, span), span, style: 'BARRE_START' });

    // Set Barre Dummy Notes replacing any existing notes
    for (let i = 1; i < span; i++) {
      let style = i === span - 1 ? 'BARRE_END' : 'BARRE_DUMMY';
      setNotePosition({
        ...getGridCoord(fret, string + i),
        span: span - i, // each "node" of the barre should tell you how much span is left...
        style,
      });
    }
  },
  _moveToBarreStart: (currentPos: string): NoteType | undefined => {
    if (parseInt(currentPos) < 0) return undefined;

    const cursor = get()._movePos(currentPos, 'left', 1);
    const noteAtCursor = get().getNoteAtPosition(cursor);

    if (noteAtCursor.style === 'BARRE_START') return noteAtCursor;
    return get()._moveToBarreStart(cursor);
  },
  _adjustForExistingBarreAtStart: ({ pos, string }, span) => {
    const existingBarreAtPos = get().getNoteAtPosition(pos);

    if (existingBarreAtPos.style === 'BARRE_END' || existingBarreAtPos.style === 'BARRE_DUMMY') {
      const existingBarreStart = get()._moveToBarreStart(pos);

      if (existingBarreStart)
        return {
          pos: existingBarreStart.pos,
          string: existingBarreStart.string,
          span: existingBarreStart.span - existingBarreAtPos.span + span,
        };
    }

    return { pos, string, span };
  },

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

    set({ gridCoordinates: coords });
  },
  _movePos: (pos, dir, distance) => {
    const { fretsCount } = get().config;
    const posNum = parseInt(pos);

    if (dir === 'left') return `${posNum - (fretsCount + 1) * distance}`;

    // if (dir === 'right') {
    return `${posNum + (fretsCount + 1) * distance}`;
    // }
  },
}));

export default useStore;
