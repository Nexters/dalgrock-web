import { getEmotionColor } from './emotion-constants'

interface DayEmotion {
  day: string
  dayLabel: string
  emotions: string[]
}

function BlurDots({ weekData }: { weekData: DayEmotion[] }) {
  return (
    <div className="relative overflow-hidden pb-[60px]">
      <div className="relative blur-[1px] mt-6">
        <div className="relative flex justify-center gap-6 px-6 opacity-40">
          {weekData
            .filter(({ emotions }) => emotions.length > 0)
            .map(({ day, emotions }) => {
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

export { BlurDots }
