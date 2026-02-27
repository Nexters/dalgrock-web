import { getEmotionColor } from './emotion-constants'

function RingBadge({
  label,
  entries,
  total
}: {
  label: string
  entries: Array<[string, number]>
  total: number
}) {
  const size = 80
  const r = 34
  const stroke = 3
  const cx = size / 2
  const cy = size / 2
  const C = 2 * Math.PI * r

  const safeTotal = total > 0 ? total : 1

  let acc = -270

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="transparent"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
        />

        {total === 0 ? (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="transparent"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={stroke}
          />
        ) : (
          entries.map(([emotion, count]) => {
            const frac = count / safeTotal
            const seg = frac * C

            const segLen = Math.max(seg, 1)

            const dasharray = `${segLen} ${C - segLen}`
            const dashoffset = -acc

            acc += seg

            return (
              <circle
                key={emotion}
                cx={cx}
                cy={cy}
                r={r}
                fill="transparent"
                stroke={getEmotionColor(emotion)}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
              />
            )
          })
        )}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[14px] font-medium text-white/80">{label}.</span>
      </div>
    </div>
  )
}

export { RingBadge }
