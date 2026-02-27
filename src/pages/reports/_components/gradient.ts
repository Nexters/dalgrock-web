export type Gradient = {
  stops: [string, string, string]
  angle?: number
}

export const GRADIENTS: Gradient[] = [
  { stops: ['#E5A5C5', '#FF8759', '#C6C9C2'] },
  { stops: ['#6370F7', '#59E174', '#AAB0C4'] },
  { stops: ['#CCA5E5', '#5988FF', '#C9C2C2'] },
  { stops: ['#F3F571', '#59E6FF', '#C2C2C9'] },
  { stops: ['#F57171', '#F3F571', '#C2C9C3'] },
  { stops: ['#FFA0C1', '#25B092', '#C9C2C5'] },
  { stops: ['#FCB0FF', '#00B4C1', '#C9C2C5'] },
  { stops: ['#387FEA', '#FF8C4F', '#DBC7D0'] },
  { stops: ['#78F571', '#EFA4FE', '#C9C2C5'] },
  { stops: ['#FFD56A', '#A481EB', '#C2C9C9'] },
  { stops: ['#FF8C4F', '#387FEA', '#DBC7D0'] },
  { stops: ['#00B4C1', '#FFD970', '#C9C2C5'] },
  { stops: ['#A481EB', '#78F571', '#C2C9C9'] },
  { stops: ['#FFC5C5', '#E95589', '#C9C2C5'] },
  { stops: ['#EFA4FE', '#FFD56A', '#C9C2C5'] },
  { stops: ['#CFE1D1', '#55E99F', '#C9C2C5'] },
  { stops: ['#DC54C6', '#70C1FF', '#C7C9C2'] },
  { stops: ['#9AFFDD', '#FF8585', '#DBC7D0'] },
  { stops: ['#95A0C0', '#FFE62A', '#C9C3C2'] },
  { stops: ['#A4D1FE', '#FF6A6A', '#C9C2C5'] }
]

export function pickUnique<T>(arr: T[], k: number, rand = Math.random): T[] {
  const n = arr.length
  if (k >= n) return [...arr]

  const idx = Array.from({ length: n }, (_, i) => i)
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rand() * (n - i))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx.slice(0, k).map(i => arr[i])
}

export function gradientCss(g: Gradient) {
  const [a, b, c] = g.stops
  return `linear-gradient(180deg, ${a} 0%, ${b} 50%, ${c} 100%)`
}
