import type { GridPosKey, CssArea } from '../store/grid.slice';
import type { ConfigType } from '../store/config.slice';

export const getColLetter = (n: number): string => {
  var letter = String.fromCharCode(n + 64);
  return letter;
};

export const getPos = (fret: number, string: number, config: ConfigType): GridPosKey => {
  const stringsCount = config.stringsCount;
  return `${(string - 1) * stringsCount + fret}`;
};

export const getCssArea = (fret: number, string: number, span: number = 1): CssArea => {
  const posStart = `pos${getColLetter(string)}${fret}-start`;
  const posEnd = `pos${getColLetter(string + span - 1)}${fret}-end`;

  return `${posStart} / ${posStart} / ${posEnd} / ${posEnd} `;
};
