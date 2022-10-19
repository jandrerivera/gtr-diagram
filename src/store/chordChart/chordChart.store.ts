import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createConfigSlice, ConfigSlice } from './config.slice'
import { createChordLabelSlice, ChordLabelSlice } from './chordLabel.slice'
import { createGridSlice, GridSlice } from './grid.slice'
import { createNotesSlice, NotesSlice } from './notes.slice'

export type State = ConfigSlice & ChordLabelSlice & GridSlice & NotesSlice
export type Middlewares = [['zustand/devtools', never], ['zustand/persist', unknown]] //[['zustand/devtools', never]];

const useChordChartStore = create<State>()(
  devtools(
    persist(
      (...a) => ({
        ...createConfigSlice(...a),
        ...createChordLabelSlice(...a),
        ...createGridSlice(...a),
        ...createNotesSlice(...a),
      }),
      {
        name: 'gtr-diagram-store',
        // serialize: (state) => btoa(JSON.stringify(state)),
        // deserialize: (str) => JSON.parse(atob(str)),

        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => {
              const blacklist = ['set', 'get', 'update', '_']
              const containsBlacklistedWord = new RegExp(blacklist.join('|')).test(key)
              return !containsBlacklistedWord
            })
          ),
      }
    )
  )
)

export default useChordChartStore
