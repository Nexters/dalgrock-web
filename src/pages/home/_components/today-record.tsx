import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TodayRecordProps {
  date: string
  hasRecord: boolean
  albumImage?: string
  albumName?: string
  emotions?: string[]
}

function TodayRecord({
  date,
  hasRecord,
  albumImage,
  albumName,
  emotions = []
}: TodayRecordProps) {
  const displayedEmotions = emotions.slice(0, 2)
  const remainingCount = emotions.length - 2

  return (
    <div className="flex flex-col items-center px-5 py-10">
      <div className="rounded-full p-[1px]">
        <Link
          to={hasRecord ? `/records/${date}` : '/records/new'}
          className="relative flex h-[232px] w-[232px] items-center justify-center rounded-full bg-[#16171c]/80"
          style={{
            boxShadow: 'inset 0 0 8px 8px rgba(255,255,255,0.1)'
          }}>
          {hasRecord && albumImage ? (
            <img
              src={albumImage}
              alt={albumName || '앨범 커버'}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Plus className="h-7 w-7 text-white" />
              <span className="text-lg font-bold text-white">기록하기</span>
            </div>
          )}
        </Link>
      </div>

      <span className="mt-4 text-sm text-white font-bold">{date}</span>

      {hasRecord && albumName && (
        <span className="mt-1 text-sm text-[#9EA4B2]">{albumName}</span>
      )}

      {hasRecord && emotions.length > 0 && (
        <div className="mt-3 flex items-center gap-1">
          {displayedEmotions.map(emotion => (
            <span
              key={emotion}
              className="rounded-full bg-[#262930] px-5 py-2 text-sm text-white">
              {emotion}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="ml-1 text-sm text-[#9EA4B2]">
              외 {remainingCount}개
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { TodayRecord }
