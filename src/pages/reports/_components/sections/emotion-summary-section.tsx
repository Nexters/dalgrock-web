import { getEmotionColor } from '../emotion-constants'
import { RingBadge } from '../ring-badge'
import { BlurDots } from '../blur-dots'

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
  const totalEmotionCount = weekData.reduce(
    (sum, { emotions }) => sum + emotions.length,
    0
  )
  const showBlurDots = totalEmotionCount >= 5

  return (
    <div className="px-5 pt-[30px] relative overflow-hidden">
      <h3 className="text-sm font-base text-[#C8CED8] mb-1">
        이번 주 감정 요약
      </h3>
      <p className="text-xl font-bold text-white mb-6">{title}</p>

      <div className="flex flex-wrap gap-y-5">
        {weekData
          .filter(({ emotions }) => emotions.length > 0)
          .map(({ day, emotions }) => {
            const emotionCounts: Record<string, number> = {}
            emotions.forEach(e => {
              emotionCounts[e] = (emotionCounts[e] || 0) + 1
            })
            const entries = Object.entries(emotionCounts)
            const total = emotions.length

            return (
              <div
                key={day}
                className="basis-1/4 flex flex-col items-center">
                <RingBadge
                  label={day}
                  entries={entries}
                  total={total}
                />

                <div className="w-[95%] mt-1.5 text-center text-xs font-bold">
                  {entries.map(([emotion], i) => (
                    <span key={emotion}>
                      {i > 0 && <span className="text-white/70"> · </span>}
                      <span style={{ color: getEmotionColor(emotion) }}>
                        {emotion}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
      </div>

      {showBlurDots && <BlurDots weekData={weekData} />}
    </div>
  )
}

export { EmotionSummarySection }
