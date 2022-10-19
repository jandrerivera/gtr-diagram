import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { NoteSymbols, NoteSymbolsType } from './chordChart/notes.slice'

export type ControlsState = {
  selectedControl: NoteSymbolsType
  setSelectedControl: (selectedControl: NoteSymbolsType) => void
}

const useControlsStore = create<ControlsState>()(
  devtools(
    (set) => ({
      selectedControl: NoteSymbols.default,
      setSelectedControl(selectedControl) {
        return set({ selectedControl }, false, 'CONTROLS/SET_SELECTED_CONTROL')
      },
    }),
    {
      name: 'gtr-diagram-store:controls',
    }
  )
)

export default useControlsStore
