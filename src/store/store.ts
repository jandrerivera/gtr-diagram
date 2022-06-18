import { ReactNode } from 'react';
import create from 'zustand';
import { getPos } from '../utils/helpers/grid';
import produce from 'immer';

export type NoteType = { pos: string; style: string };

interface GlobalStateType {
  config: {
    stringsCount: number;
    fretsCount: number;
    defaultChordLabel: string;
    setConfig: Function;
  };

  tuning: string[];

  chordLabel: {
    enabled: boolean;
    typed: string;
    styled: string;
    setChordLabel: Function;
    toggleChordLabel: Function;
  };

  gridCoordinates: {
    pos: string;
    fret: number;
    string: number;
  }[];
  buildGridCoordinates: Function;

  notePositions: {
    [pos: string]: NoteType;
  };
  getNotePositionsArr: () => NoteType[];
  setNotePosition: (notes: NoteType) => void;
  unsetNotePosition: Function;
}

type ConfigType = GlobalStateType['config'];

const useStore = create<GlobalStateType>((set, get) => ({
  config: {
    stringsCount: 0,
    fretsCount: 0,
    defaultChordLabel: '0',
    setConfig: (config: ConfigType) => {
      set({ config });
      get().buildGridCoordinates();
      get().chordLabel.setChordLabel(config.defaultChordLabel);
    },
  },

  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

  chordLabel: {
    enabled: false,
    typed: '',
    styled: '',
    setChordLabel: (payload: string) =>
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
  },

  notePositions: {},
  getNotePositionsArr: () => Object.values(get().notePositions),

  setNotePosition: (notes) =>
    set((state) => {
      const newState = { ...state.notePositions };
      newState[notes.pos] = notes;
      return { notePositions: newState };
    }),
  unsetNotePosition: (pos: string) => {
    set((state) => {
      const newState = { ...state.notePositions };
      delete newState[pos];
      return { notePositions: newState };
    });
  },

  gridCoordinates: [{ pos: 'posA0', fret: 0, string: 1 }],
  buildGridCoordinates: () => {
    let coords = [];
    const strings = get().config.stringsCount;
    const frets = get().config.fretsCount;

    for (let i = 1; i <= strings; i++) {
      let string = i;
      for (let j = 0; j <= frets; j++) {
        let fret = j;
        let pos = getPos(fret, string);
        coords.push({ pos, fret, string });
      }
    }

    set({ gridCoordinates: coords });
  },
}));

export default useStore;
