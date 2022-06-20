export const getColLetter = (n: number): string => {
  var letter = String.fromCharCode(n + 64);
  return letter;
};

export const getPos = (fret: number, string: number, span: number = 1): string => {
  const posStart = `pos${getColLetter(string)}${fret}-start`;
  const posEnd = `pos${getColLetter(string + span - 1)}${fret}-end`;

  return `${posStart} / ${posStart} / ${posEnd} / ${posEnd} `;
};
