function hasFinalConsonant(str: string): boolean {
  if (!str || str.length === 0) return false

  const lastChar = str[str.length - 1]
  const code = lastChar.charCodeAt(0)

  if (code < 0xac00 || code > 0xd7a3) {
    return false
  }

  return (code - 0xac00) % 28 !== 0
}

export function getJosa(
  word: string,
  withConsonant: string,
  withoutConsonant: string
): string {
  return hasFinalConsonant(word) ? withConsonant : withoutConsonant
}

export function withEulReul(word: string): string {
  return word + getJosa(word, '을', '를')
}
