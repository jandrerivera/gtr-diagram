import { StateCreator } from 'zustand'
import { State, Middlewares } from '../chordChart.store'
import type { GridPosKey, GridCoordinateType } from './grid.slice'
import { v4 as uuidv4 } from 'uuid'

export const UtilitySymbols = {
  blank: 'BLANK',
  default: 'DEFAULT',
} as const

export const BasicNoteSymbols = {
  circle: 'CIRCLE',
  circleOutline: 'CIRCLE_OUTLINE',
  square: 'SQUARE',
  squareOutline: 'SQUARE_OUTLINE',
  diamond: 'DIAMOND',
  diamondOutline: 'DIAMOND_OUTLINE',
  triangle: 'TRIANGLE',
  triangleOutline: 'TRIANGLE_OUTLINE',
  cross: 'CROSS',
  crossOutline: 'CROSS_OUTLINE',
  barre: 'BARRE',
  barreOutline: 'BARRE_OUTLINE',
  barreSquare: 'BARRE_SQUARE',
  barreSuqareOutline: 'BARRE_SQUARE_OUTLINE',
} as const

export type UtilitySymbolsType = typeof UtilitySymbols[keyof typeof UtilitySymbols]
export type BasicNoteSymbolsType = typeof BasicNoteSymbols[keyof typeof BasicNoteSymbols]

export const NoteSymbols = { ...UtilitySymbols, ...BasicNoteSymbols } as const
export type NoteSymbolsType = typeof NoteSymbols[keyof typeof NoteSymbols]

export type SymbolType = { style: NoteSymbolsType; label?: string; span?: number }

type NoteId = string
export type NoteType = GridCoordinateType & {
  id: NoteId
  childOf?: NoteId
  symbol: SymbolType
}

export type BarreType = GridCoordinateType & {
  id: NoteId
  symbol: SymbolType & { span: number }
}

type withOptionalId<T> = Omit<T, 'id'> & { id?: NoteId }

export type NotesSlice = {
  notePositions: NoteType[]
  setNotePosition: (note: withOptionalId<NoteType> | withOptionalId<BarreType>) => NoteId
  updateNotePosition: (note: NoteType | BarreType) => void
  getNoteAtPosition: (pos: GridPosKey) => NoteType | undefined
  unsetNotePosition: (pos: GridPosKey) => void
  resetNotePositions: () => void
  setBarrePosition: (note: withOptionalId<BarreType>) => void
  updateBarreSize: (note: BarreType) => void
  _unsetChildNotes: (parentId: NoteId) => void
  _addSpacerNotes: (note: withOptionalId<BarreType>, id: NoteId) => void
}

export const createNotesSlice: StateCreator<State, Middlewares, [], NotesSlice> = (set, get) => ({
  notePositions: [],
  resetNotePositions: () => set({ notePositions: [] }, false, 'NOTES/RESET_NOTE_POSITIONS'),
  setNotePosition: (note) => {
    const id = uuidv4()

    set(
      (state) => {
        //Remove any notes in same Position
        let newState = [...state.notePositions].filter((old) => old.pos !== note.pos)

        return { notePositions: [...newState, { ...note, id }] }
      },
      false,
      'NOTES/SET_NOTE_POSITION'
    )

    return id
  },
  updateNotePosition: (note) => {
    return set(
      (state) => {
        let newState = [...state.notePositions].map((old) => (old.id === note.id ? note : old))
        return { notePositions: newState }
      },
      false,
      'NOTES/UPDATE_NOTE_POSITION'
    )
  },
  unsetNotePosition: (pos) => {
    return set(
      (state) => {
        const id = [...state.notePositions].find((note) => note.pos === pos)?.id
        return {
          notePositions: [...state.notePositions].filter(
            (note) => note.childOf !== id && note.pos !== pos
          ),
        }
      },
      false,
      'NOTES/UNSET_NOTE_POSITION'
    )
  },
  getNoteAtPosition(pos) {
    const note = get().notePositions.find((note) => note.pos === pos)
    return note
  },
  setBarrePosition: ({ fret, string, symbol }) => {
    const { span = 2 } = symbol
    const note = {
      ...get().getGridCoord(fret, string, span),
      symbol: { ...symbol, span },
    }

    const parentId = get().setNotePosition(note)

    // Replace notes under barre with spacer child notes
    get()._addSpacerNotes(note, parentId)
  },
  updateBarreSize: ({ id, fret, string, symbol }) => {
    const { span = 2 } = symbol

    const note = {
      ...get().getGridCoord(fret, string, span),
      id,
      symbol: { ...symbol, span },
    }

    get().updateNotePosition(note)

    if (id) {
      //Reset all child notes
      get()._unsetChildNotes(id)

      // Replace notes under barre with spacer child notes
      get()._addSpacerNotes(note, id)
    }
  },
  _unsetChildNotes: (parentId) => {
    console.log('unsetChildNotes', parentId)
    return set(
      (state) => ({
        notePositions: [...state.notePositions].filter((note) => note.childOf !== parentId),
      }),
      false,
      'NOTES/UNSET_CHILD_NOTES'
    )
  },
  _addSpacerNotes: ({ fret, string, symbol }, parentId) => {
    const { span } = symbol

    for (let i = 1; i < span; i++) {
      get().setNotePosition({
        ...get().getGridCoord(fret, string + i),
        childOf: parentId,
        symbol: { ...symbol, style: NoteSymbols.blank },
      })
    }
  },
})
