import { getEmotionColor } from '../emotion-constants'

interface DayEmotion {
  day: string
  dayLabel: string
  emotions: string[]
}

interface EmotionSummarySectionProps {
  title: string
  weekData: DayEmotion[]
}

function EmotionSummarySection({
  title,
  weekData
}: EmotionSummarySectionProps) {
  return (
    <div className="px-5 pt-[30px] relative overflow-hidden">
      <h3 className="text-sm font-base text-[#C8CED8] mb-1">
        이번 주 감정 요약
      </h3>
      <p className="text-xl font-bold text-white mb-6">{title}</p>

      <div className="flex flex-wrap gap-y-5">
        {weekData.map(({ day, emotions }, index) => {
          const emotionCounts: Record<string, number> = {}
          emotions.forEach(e => {
            emotionCounts[e] = (emotionCounts[e] || 0) + 1
          })
          const entries = Object.entries(emotionCounts)
          const total = emotions.length

          const basisClass = index < 4 ? 'basis-1/4' : 'basis-1/4'

          return (
            <div
              key={day}
              className={`${basisClass} flex flex-col items-center`}>
              <RingBadge
                label={day}
                entries={entries}
                total={total}
              />

              <div className="mt-1.5 text-center text-xs font-bold">
                {entries.length === 0 ? (
                  <span className="text-gray-500">-</span>
                ) : (
                  entries.map(([emotion], i) => (
                    <span key={emotion}>
                      {i > 0 && <span className="text-white/70"> · </span>}
                      <span style={{ color: getEmotionColor(emotion) }}>
                        {emotion}
                      </span>
                    </span>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      <BlurDots weekData={weekData} />
    </div>
  )
}

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

function BlurDots({ weekData }: { weekData: DayEmotion[] }) {
  return (
    <div className="relative overflow-hidden pb-[60px]">
      <div className="relative blur-[1px] mt-6">
        <div className="relative flex justify-between px-6 opacity-40">
          {weekData.map(({ day, emotions }) => {
            const counts: Record<string, number> = {}
            emotions.forEach(e => (counts[e] = (counts[e] || 0) + 1))
            const dots = Object.entries(counts)

            return (
              <div
                key={day}
                className="flex flex-col-reverse items-center gap-0.5">
                {dots.map(([emotion], i) => (
                  <div
                    key={`${day}-${emotion}-${i}`}
                    className="rounded-full"
                    style={{
                      width: 24,
                      height: 24,
                      backgroundImage: `
                        linear-gradient(145deg,
                          rgba(255,255,255,0.22) 0%,
                          rgba(255,255,255,0.10) 35%,
                          rgba(0,0,0,0.10) 100%
                        ),
                        linear-gradient(${getEmotionColor(emotion)}, ${getEmotionColor(emotion)})
                      `,
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(2px)',
                      boxShadow: `0 0 12px rgba(255,255,255,0.06)`
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <div
        className="top-12 h-[60%] pointer-events-none absolute inset-0 "
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      />

      <div
        className="top-18 h-[50%] pointer-events-none absolute inset-0 "
        style={{
          backdropFilter: 'blur(2.5px)',
          WebkitBackdropFilter: 'blur(2.5px)'
        }}
      />
    </div>
  )
}

export { EmotionSummarySection }
