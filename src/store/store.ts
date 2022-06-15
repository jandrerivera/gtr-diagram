import create from 'zustand';
import { getPos } from '../utils/helpers/grid';

export type NoteType = { pos: string; style: string };

interface GlobalStateType {
  config: {
    stringsCount: number;
    fretsCount: number;
  };
  setConfig: Function;

  tuning: string[];

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
// export type NoteType = GlobalStateType['notePositions'];

const useStore = create<GlobalStateType>((set, get) => ({
  config: {
    stringsCount: 0,
    fretsCount: 0,
  },
  setConfig: (config: ConfigType) => {
    set({ config });
    get().buildGridCoordinates();
  },

  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

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
