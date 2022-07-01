import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createConfigSlice, ConfigSlice } from './config.slice';
import { createChordLabelSlice, ChordLabelSlice } from './chordLabel.slice';
import { createGridSlice, GridSlice } from './grid.slice';
import { createNotesSlice, NotesSlice } from './notes.slice';
import { createControlsSlice, ControlsSlice } from './controls.slice';

export type State = ConfigSlice & ChordLabelSlice & GridSlice & NotesSlice & ControlsSlice;
export type Middlewares = [['zustand/devtools', never], ['zustand/persist', unknown]]; //[['zustand/devtools', never]];

const useStore = create<State>()(
  devtools(
    persist(
      (...a) => ({
        ...createConfigSlice(...a),
        ...createChordLabelSlice(...a),
        ...createGridSlice(...a),
        ...createNotesSlice(...a),
        ...createControlsSlice(...a),
      }),
      {
        name: 'gtr-diagram-store',
        // serialize: (state) => btoa(JSON.stringify(state)),
        // deserialize: (str) => JSON.parse(atob(str)),

        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => {
              const blacklist = ['set', 'get', '_'];
              const containsBlacklistedWord = new RegExp(blacklist.join('|')).test(key);
              return !containsBlacklistedWord;
            })
          ),
      }
    )
  )
);

export default useStore;

// chordLabel: {enabled: false, typed: '', styled: ''}
// config: {stringsCount: 0, fretsCount: 0, defaultChordLabel: '0', tuning: Array(6)}
// dragAreaRef: {current: null}
// gridCoordinates: [{…}]
// notePositions: {}
// selectedControl: "DEFAULT"
