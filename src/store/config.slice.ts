import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';

export type ConfigSlice = {
  config: {
    stringsCount: number;
    fretsCount: number;
    defaultChordLabel: string;
    tuning: string[];
  };
  setConfig: (config: ConfigType) => void;
};

export type ConfigType = ConfigSlice['config'];

export const createConfigSlice: StateCreator<State, Middlewares, [], ConfigSlice> = (set, get) => ({
  config: {
    stringsCount: 0,
    fretsCount: 0,
    defaultChordLabel: '0',
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
  },
  setConfig: (config) => {
    set({ config }, false, 'CONFIG/SET_CONFIG');
    get()._generateCoordinateGrid();
    get().setChordLabel(config.defaultChordLabel);
  },
});
