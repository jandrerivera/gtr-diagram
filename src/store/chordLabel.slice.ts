import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';

import produce from 'immer';

export type ChordLabelSlice = {
  chordLabel: {
    enabled: boolean;
    typed: string;
    styled: string;
  };
  setChordLabel: (payload: string) => void;
  toggleChordLabel: () => void;
};

export const createChordLabelSlice: StateCreator<State, Middlewares, [], ChordLabelSlice> = (
  set,
  get
) => ({
  chordLabel: {
    enabled: false,
    typed: '',
    styled: '',
  },
  setChordLabel: (payload) =>
    set(
      produce((state) => {
        state.chordLabel.typed = payload;
        state.chordLabel.styled = payload;
      }),
      false,
      'CHORD_LABEL/SET_LABEL'
    ),
  toggleChordLabel: () =>
    set(
      produce((state) => {
        state.chordLabel.enabled = !state.chordLabel.enabled;
      }),
      false,
      'CHORD_LABEL/TOGGLE_DISPLAY'
    ),
});
