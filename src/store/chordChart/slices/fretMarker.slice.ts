import { StateCreator } from 'zustand'
import { State, Middlewares } from '../chordChart.store'
import produce from 'immer'

export type FretMarkerSlice = {
  fretMarker: {
    enabled: boolean
    pos: number
    label: number
  }
  toggleFretMarker: () => void
  shiftFretMarker: (dir: 'up' | 'down') => void
  changeFretLabel: (dir: 'increase' | 'decrease') => void
}

const defaultFretMarker = {
  enabled: false,
  pos: 1,
  label: 5,
}

export const createFretMarkerSlice: StateCreator<State, Middlewares, [], FretMarkerSlice> = (
  set,
  get
) => ({
  fretMarker: defaultFretMarker,
  toggleFretMarker: () => {
    set(
      produce((state) => {
        state.fretMarker.enabled = !state.fretMarker.enabled

        //Reset marker when you hide it
        if (state.fretMarker.enabled === false) {
          state.fretMarker.pos = defaultFretMarker.pos
          state.fretMarker.label = defaultFretMarker.label
        }
      }),
      false,
      'FRET_MARKET/TOGGLE'
    )
  },
  shiftFretMarker: (dir) => {
    const maxFret = get().config.fretsCount
    const currentPos = get().fretMarker.pos

    let newPos = dir === 'down' ? currentPos + 1 : currentPos - 1
    newPos = newPos < 1 ? 1 : newPos
    newPos = newPos >= maxFret ? maxFret : newPos

    set(
      produce((state) => {
        state.fretMarker.pos = newPos
      }),
      false,
      'FRET_MARKET/SHIFT'
    )
  },
  changeFretLabel: (dir) => {
    const maxFret = 24
    const currentLabel = get().fretMarker.label

    let newLabel = dir === 'increase' ? currentLabel + 1 : currentLabel - 1
    newLabel = newLabel < 1 ? 1 : newLabel
    newLabel = newLabel >= maxFret ? maxFret : newLabel

    set(
      produce((state) => {
        state.fretMarker.label = newLabel
      }),
      false,
      'FRET_MARKET/LABEL'
    )
  },
})
