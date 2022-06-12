export const getColLetter = (n: number): string => {
  var letter = String.fromCharCode(n + 64);
  return letter;
};

export const getPos = (fret: number, string: number): string => {
  return `pos${getColLetter(string + 1)}${fret}`;
};
