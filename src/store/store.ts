import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createConfigSlice, ConfigSlice } from './config.slice';
import { createChordLabelSlice, ChordLabelSlice } from './chordLabel.slice';
import { createGridSlice, GridSlice } from './grid.slice';
import { createNotesSlice, NotesSlice } from './notes.slice';

export type State = ConfigSlice & ChordLabelSlice & GridSlice & NotesSlice;
export type Middlewares = [['zustand/devtools', never]]; //[['zustand/devtools', never], ['zustand/persist', unknown]];

const useStore = create<State>()(
  devtools(
    // persist(
    (...a) => ({
      ...createConfigSlice(...a),
      ...createChordLabelSlice(...a),
      ...createGridSlice(...a),
      ...createNotesSlice(...a),
    })
    // )
  )
);

export default useStore;
