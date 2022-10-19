import { StateCreator } from 'zustand'
import { State, Middlewares } from '../chordChart.store'
import produce from 'immer'

export type ConfigSlice = {
  config: {
    stringsCount: number
    fretsCount: number
    defaultChordLabel: string
    tuning: string[]
  }
  setConfig: (config?: Partial<ConfigType>) => void
}

export type ConfigType = ConfigSlice['config']

export const defaultConfig: ConfigType = {
  stringsCount: 6,
  fretsCount: 5,
  defaultChordLabel: 'C',
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
}

export const createConfigSlice: StateCreator<State, Middlewares, [], ConfigSlice> = (set, get) => ({
  config: defaultConfig,
  setConfig: (newConfig) => {
    if (newConfig) {
      set(
        produce((state) => {
          state.config = { ...state.config, ...newConfig }
        }),
        false,
        'CONFIG/SET_CONFIG'
      )
    }

    if (newConfig?.defaultChordLabel) {
      get().setChordLabel(newConfig.defaultChordLabel)
    }

    get()._generateCoordinateGrid()
  },
})
