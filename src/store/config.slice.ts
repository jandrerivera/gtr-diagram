import { StateCreator } from 'zustand'
import { State, Middlewares } from './store'

//  TODO: Fix Config types to allow just partial settings on init. Also force length of tuning array to same a stringsCount

export type ConfigSlice = {
  config: {
    stringsCount: number
    fretsCount: number
    defaultChordLabel: string
    tuning: string[]
  }
  setConfig: (config: ConfigType) => void
}

export type ConfigType = ConfigSlice['config']

export const createConfigSlice: StateCreator<State, Middlewares, [], ConfigSlice> = (set, get) => ({
  config: {
    stringsCount: 6,
    fretsCount: 5,
    defaultChordLabel: 'C',
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
  },
  setConfig: (config) => {
    set({ config }, false, 'CONFIG/SET_CONFIG')
    get()._generateCoordinateGrid()
    get().setChordLabel(config.defaultChordLabel)
  },
})
