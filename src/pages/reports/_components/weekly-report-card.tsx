import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { DashedBorder } from './dashed-border'

interface WeeklyReportCardProps {
  month: number
  week: number
  recordCount: number
  isAnalyzing?: boolean
  title?: string
  tags?: string[]
  onClick?: () => void
}

function WeeklyReportCard({
  month,
  week,
  recordCount,
  isAnalyzing = false,
  title,
  tags = [],
  onClick
}: WeeklyReportCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded-2xl',
        !isAnalyzing &&
          'bg-[linear-gradient(142.18deg,rgba(255,255,255,0.036)_14.51%,rgba(255,255,255,0.012)_50.05%,rgba(255,255,255,0.036)_85.94%)] p-[1px]',
        isAnalyzing && 'p-[1px]'
      )}>
      {isAnalyzing && (
        <DashedBorder
          radius={16}
          dash="8 8"
        />
      )}

      <div
        className={cn(
          'rounded-2xl py-6 px-5 backdrop-blur-[20px]',
          'bg-[#1C1D2399]'
        )}
        style={{
          boxShadow: 'inset 0px 0px 20px 0px #FFFFFF0A'
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

            {tags.length > 0 && (
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

            <div className="my-14 flex justify-center">
              <div className="h-40 w-40 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                graphic
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { WeeklyReportCard }
