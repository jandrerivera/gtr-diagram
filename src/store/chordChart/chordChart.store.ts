import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createConfigSlice, ConfigSlice } from './slices/config.slice'
import { createChordLabelSlice, ChordLabelSlice } from './slices/chordLabel.slice'
import { createGridSlice, GridSlice } from './slices/grid.slice'
import { createNotesSlice, NotesSlice } from './slices/notes.slice'
import { createFretMarkerSlice, FretMarkerSlice } from './slices/fretMarker.slice'

export type State = ConfigSlice & ChordLabelSlice & GridSlice & NotesSlice & FretMarkerSlice
export type Middlewares = [['zustand/devtools', never]] //[['zustand/devtools', never], ['zustand/persist', unknown]]

const useChordChartStore = create<State>()(
  devtools(
    // persist(
    (...a) => ({
      ...createConfigSlice(...a),
      ...createChordLabelSlice(...a),
      ...createGridSlice(...a),
      ...createNotesSlice(...a),
      ...createFretMarkerSlice(...a),
    })
    // {
    //   name: 'gtr-diagram-store',
    //   // serialize: (state) => btoa(JSON.stringify(state)),
    //   // deserialize: (str) => JSON.parse(atob(str)),

    //   partialize: (state) =>
    //     Object.fromEntries(
    //       Object.entries(state).filter(([key]) => {
    //         const blacklist = ['set', 'get', 'update', '_']
    //         const containsBlacklistedWord = new RegExp(blacklist.join('|')).test(key)
    //         return !containsBlacklistedWord
    //       })
    //     ),
    // }
    // )
  )
)

export default useChordChartStore
