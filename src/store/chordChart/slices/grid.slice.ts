import { StateCreator } from 'zustand'
import { State, Middlewares } from '../chordChart.store'

export type GridPosKey = string
export type CssArea = string

export type GridCoordinateType = {
  pos: GridPosKey
  cssArea: CssArea
  fret: number
  string: number
}

export type GridSlice = {
  gridCoordinates: GridCoordinateType[]
  getGridCoord: (fret: number, string: number, span?: number) => GridCoordinateType
  getPos: (fret: number, string: number) => GridPosKey
  getCssArea: (fret: number, string: number, span?: number) => CssArea
  getMaxSpanFromString: (string: number) => number
  _generateCoordinateGrid: () => void
}

export const createGridSlice: StateCreator<State, Middlewares, [], GridSlice> = (set, get) => ({
  gridCoordinates: [{ pos: '0', cssArea: 'posA0', fret: 0, string: 1 }],
  getGridCoord: (fret, string, span = 1) => {
    return {
      pos: get().getPos(fret, string),
      cssArea: get().getCssArea(fret, string, span),
      fret,
      string,
    }
  },
  getPos: (fret, string) => {
    const stringsCount = get().config.stringsCount
    return `${(string - 1) * stringsCount + fret}`
  },

  getCssArea: (fret, string, span = 1) => {
    const posStart = `pos${getColLetter(string)}${fret}-start`
    const posEnd = `pos${getColLetter(string + span - 1)}${fret}-end`

    return `${posStart} / ${posStart} / ${posEnd} / ${posEnd} `
  },
  getMaxSpanFromString: (string) => {
    return get().config.stringsCount - (string - 1)
  },
  _generateCoordinateGrid: () => {
    let coords = []
    const { fretsCount, stringsCount } = get().config
    for (let i = 1; i <= stringsCount; i++) {
      let string = i
      for (let j = 0; j <= fretsCount; j++) {
        let fret = j
        let pos = get().getPos(fret, string)
        let cssArea = get().getCssArea(fret, string)
        coords.push({ pos, cssArea, fret, string })
      }
    }
    set({ gridCoordinates: coords }, false, 'GRID/GENERATE_COORDINATE_GRID')
  },
})

const getColLetter = (n: number): string => {
  var letter = String.fromCharCode(n + 64)
  return letter
}
