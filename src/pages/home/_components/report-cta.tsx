import { Link } from 'react-router-dom'

interface ReportCTAProps {
  isReportReady: boolean
  daysUntilReport: number
}

function ReportCTA({ isReportReady, daysUntilReport }: ReportCTAProps) {
  if (isReportReady) {
    return (
      <div className="px-5 pb-6 pt-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm leading-[20px] tracking-[-0.25px] text-white">
            <span className="font-bold">이번 주 분석 리포트</span>{' '}
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(to bottom, #73f0de, #f4dd4b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
              도착!
            </span>
          </p>
          <Link
            to="/reports"
            className="flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-semibold leading-[22px] text-[#16171c]"
            style={{
              background: 'linear-gradient(to bottom, #6af3df, #fff0b7)'
            }}>
            분석 보러가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pb-6 pt-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <span className="text-sm leading-[20px] tracking-[-0.25px] text-white">
            이번 주 분석 리포트까지
          </span>
          <span
            className="text-sm font-bold leading-[21px] tracking-[-0.4px]"
            style={{
              background: 'linear-gradient(to bottom, #73f0de, #f4dd4b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            D-{daysUntilReport}
          </span>
        </div>
        <div className="relative h-[7px] w-full overflow-hidden rounded-full bg-[#16171c]">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${((7 - daysUntilReport) / 7) * 100}%`,
              background: 'linear-gradient(to right, #73f0de, #f4dd4b)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { ReportCTA }
