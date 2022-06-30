import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import { NoteSymbols } from './notes.slice';

// type SymbolsInControls = {
//   [value in NoteSymbols]: JSX.Element | null;
// };

export type ControlsSlice = {
  selectedControl: NoteSymbols;
  setSelectedControl: (selectedControl: NoteSymbols) => void;
};

export const createControlsSlice: StateCreator<State, Middlewares, [], ControlsSlice> = (
  set,
  get
) => ({
  selectedControl: NoteSymbols.default,
  setSelectedControl(selectedControl) {
    return set((state) => ({ ...state, selectedControl }), false, 'CONTROLS/SET_SELECTED_CONTROL');
  },
});
