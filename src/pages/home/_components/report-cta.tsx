import { Link } from 'react-router-dom'

interface ReportCTAProps {
  isReportReady: boolean
  daysUntilReport: number
}

// fill1 (yellow, visible:false) → 비활성 레이어, 제외
// fill2 (opacity 0.7): transparent → #72ebd9 (stop opacity 0.6) at 56.7%
//   gradient handle가 요소 높이의 175%까지 뻗어 있어
//   stop 0.567 × 1.75 ≈ 100% 위치에 도달 → CSS에서 100%로 표현
//   최종 opacity: 0.7 × 0.6 = 0.42
const wrapperStyle = {
  background:
    'linear-gradient(180deg, rgba(114,235,217,0) 0%, rgba(114,235,217,0.42) 100%)'
}

const gradientText = {
  background: 'linear-gradient(to bottom, #73f0de, #f4dd4b)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const
}

function ReportCTA({ isReportReady, daysUntilReport }: ReportCTAProps) {
  if (isReportReady) {
    return (
      <div
        className="mt-auto px-5 pb-6 pt-12"
        style={wrapperStyle}>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/reports"
            className="flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-semibold leading-[22px] text-[#16171c]"
            style={{
              background: 'linear-gradient(to bottom, #6af3df, #fff0b7)'
            }}>
            이번주 분석 리포트 보러가기
          </Link>
        </div>
      </div>
    )
  }

  const progress = ((7 - daysUntilReport) / 7) * 100

  return (
    <div
      className="mt-auto px-5 pb-6 pt-12"
      style={wrapperStyle}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm leading-[20px] tracking-[-0.25px] text-white">
            이번 주 분석 리포트까지
          </span>
          <span
            className="text-sm font-bold leading-[21px] tracking-[-0.4px]"
            style={gradientText}>
            D-{daysUntilReport}
          </span>
        </div>

        <div className="relative h-[13px] w-full">
          <div className="absolute inset-x-0 top-[3px] h-[7px] rounded-full bg-[#16171c]" />
          <div
            className="absolute left-0 top-[3px] h-[7px] rounded-full"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(to bottom, #73f0de 50%, #f4dd4b 100%)'
            }}
          />

          <div
            className="absolute top-0 h-[13px] w-[13px] -translate-x-1/2 rounded-full opacity-40"
            style={{
              left: `calc(${progress}% - 2px)`,
              backgroundColor: '#9bebb1'
            }}
          />

          <div
            className="absolute top-[3.15px] h-[6.7px] w-[6.7px] -translate-x-1/2 rounded-full"
            style={{
              left: `calc(${progress}% - 2px)`,
              backgroundColor: '#9bebb1',
              boxShadow: '0 0 6px 2px rgba(155,235,177,0.5)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { ReportCTA }
