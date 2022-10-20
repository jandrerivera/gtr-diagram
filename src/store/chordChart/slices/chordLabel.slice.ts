import { StateCreator } from 'zustand'
import { State, Middlewares } from '../chordChart.store'
import produce from 'immer'

export type ChordLabelSlice = {
  chordLabel: {
    enabled: boolean
    typed: string
    styled: string
  }
  setChordLabel: (payload: string) => void
  setChordLabelEnabled: () => void
}

export const defaultChordLabel = 'C'

export const createChordLabelSlice: StateCreator<State, Middlewares, [], ChordLabelSlice> = (
  set,
  get
) => ({
  chordLabel: {
    enabled: false,
    typed: defaultChordLabel,
    styled: defaultChordLabel,
  },
  setChordLabel: (payload) =>
    set(
      produce((state) => {
        state.chordLabel.typed = payload
        state.chordLabel.styled = payload
      }),
      false,
      'CHORD_LABEL/SET_LABEL'
    ),
  setChordLabelEnabled: () =>
    set(
      produce((state) => {
        state.chordLabel.enabled = !state.chordLabel.enabled
      }),
      false,
      'CHORD_LABEL/TOGGLE_DISPLAY'
    ),
})
