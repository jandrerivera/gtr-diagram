export const buildGridTemplate = (fretsCount: number, stringsCount: number): string => {
  let fretsTemplate = ''

  for (let i = 1; i <= fretsCount; i++) {
    const newLine = i > 1 ? '\n' : ''
    fretsTemplate += `${newLine} '${buildPosGridTemplateRow(i, stringsCount)}'`
  }

  return `
  '${buildPosGridTemplateRow(0, stringsCount)}'
  '${buildLabelGridTemplateRow('nut', stringsCount - 1)}'
  ${fretsTemplate}
  '${buildLabelGridTemplateRow('spacer', stringsCount - 1)}'
  `
}

export const buildPosGridTemplateRow = (pos: number, strings: number): string => {
  let stringTemplate = pos > 0 ? `fret${pos} ` : '. '

  for (let i = 1; i <= strings; i++) {
    stringTemplate += `pos${getLetter(i)}${pos} pos${getLetter(i)}${pos} `
  }

  return stringTemplate + ' .'
}

export const buildLabelGridTemplateRow = (
  areaName: string,
  strings: number,
  spacers: number = 2
): string => {
  let stringTemplate = ''

  //add spacers at the start
  for (let i = 1; i <= spacers; i++) {
    stringTemplate += `. `
  }

  //add Named Areas
  for (let i = 1; i <= strings; i++) {
    stringTemplate += `${areaName} ${areaName} `
  }

  //add spacers at the end
  for (let i = 1; i <= spacers; i++) {
    stringTemplate += `. `
  }

  return stringTemplate
}

export function getLetter(num: number) {
  var letter = String.fromCharCode(num + 64)
  return letter
}
