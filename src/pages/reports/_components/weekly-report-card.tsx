import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { DashedBorder } from './dashed-border'
import { EMOTION_CATEGORIES, type EmotionCategory } from './emotion-constants'

interface WeeklyReportCardProps {
  month: number
  week: number
  recordCount: number
  isAnalyzing?: boolean
  title?: string
  tags?: string[]
  emotionCategory?: EmotionCategory
  representativeThumbnail?: string
  thumbnails?: string[]
  onClick?: () => void
}

function WeeklyReportCard({
  month,
  week,
  recordCount,
  isAnalyzing = false,
  title,
  tags = [],
  emotionCategory,
  representativeThumbnail,
  thumbnails = [],
  onClick
}: WeeklyReportCardProps) {
  const backgroundImage =
    !isAnalyzing && emotionCategory
      ? EMOTION_CATEGORIES[emotionCategory].backgroundTop
      : null

  return (
    <div
      onClick={isAnalyzing ? undefined : onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        !isAnalyzing && 'cursor-pointer',
        !isAnalyzing &&
          'bg-[linear-gradient(142.18deg,rgba(255,255,255,0.036)_14.51%,rgba(255,255,255,0.012)_50.05%,rgba(255,255,255,0.036)_85.94%)] p-[1px]',
        isAnalyzing && 'p-[1px]'
      )}>
      {backgroundImage && (
        <div
          className="absolute inset-0 top-4 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            scale: '1.5'
          }}
        />
      )}

      {!isAnalyzing && backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(22,23,28, 0.7) 0%, rgba(22,23,28,0) 50%, rgba(22,23,28,0) 100%)'
          }}
        />
      )}

      {isAnalyzing && (
        <DashedBorder
          radius={16}
          dash="8 8"
        />
      )}

      <div
        className={cn(
          'rounded-2xl py-6 px-5 backdrop-blur-[20px] relative',
          isAnalyzing && 'bg-[#1C1D2399]'
        )}
        style={{
          boxShadow: !isAnalyzing
            ? 'inset 0px 0px 20px 0px rgba(255,255,255,0.3)'
            : 'inset 0px 0px 20px 0px #FFFFFF0A'
        }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-white">
              {month}월 {week}주차{' '}
              <span className="font-normal"> · {recordCount}개의 기록</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-white">
              {isAnalyzing
                ? '이번 주 분석을 진행중이에요 🎁'
                : title || '이번 주의 리포트'}
            </h3>

            {!isAnalyzing && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      'rounded-full px-2.5 py-1 text-white border border-white/15 bg-white/10 backdrop-blur-[14px]',
                      'shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]',
                      'text-[14px] font-medium'
                    )}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {isAnalyzing ? (
              <div className="my-14 flex justify-center">
                <div className="h-40 w-40 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                  graphic
                </div>
              </div>
            ) : (
              <div className="relative mt-3 h-[180px] overflow-visible">
                <div
                  className="absolute rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    width: '68px',
                    height: '68px',
                    left: '-30px',
                    top: '60px',
                    zIndex: 1,
                    opacity: 0.2
                  }}>
                  {thumbnails[3] ? (
                    <img
                      src={thumbnails[3]}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs select-none">
                      album
                    </div>
                  )}
                </div>

                <div
                  className="absolute rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    width: '108px',
                    height: '108px',
                    left: '5px',
                    top: '50px',
                    zIndex: 2,
                    boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)'
                  }}>
                  {thumbnails[0] ? (
                    <img
                      src={thumbnails[0]}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs select-none">
                      album
                    </div>
                  )}
                </div>

                <div
                  className="absolute rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    width: '132px',
                    height: '132px',
                    left: '50%',
                    top: '0',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    boxShadow: 'inset 0 0 24px rgba(255, 255, 255, 0.4)'
                  }}>
                  {representativeThumbnail ? (
                    <img
                      src={representativeThumbnail}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-sm select-none">
                      album
                    </div>
                  )}
                </div>

                <div
                  className="absolute rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    width: '56px',
                    height: '56px',
                    right: '30px',
                    top: '115px',
                    zIndex: 2,
                    boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.3)'
                  }}>
                  {thumbnails[1] ? (
                    <img
                      src={thumbnails[1]}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs select-none">
                      album
                    </div>
                  )}
                </div>

                <div
                  className="absolute rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    width: '68px',
                    height: '68px',
                    right: '-35px',
                    top: '40px',
                    zIndex: 1,
                    opacity: 0.2
                  }}>
                  {thumbnails[2] ? (
                    <img
                      src={thumbnails[2]}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs select-none">
                      album
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { WeeklyReportCard }
