import { CircleArrowIcon } from '@/components/icons/circle-arrow'

interface MonthSelectorProps {
  month: string
  onPrevMonth: () => void
  onNextMonth: () => void
  onViewAll: () => void
}

function MonthSelector({
  month,
  onPrevMonth,
  onNextMonth,
  onViewAll
}: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between px-5 py-5">
      <div className="flex items-center gap-3 pl-4">
        <button
          onClick={onPrevMonth}
          className="p-1">
          <CircleArrowIcon direction="left" />
        </button>
        <h2 className="text-base font-bold text-[#C8CED8]">{month}</h2>
        <button
          onClick={onNextMonth}
          className="p-1">
          <CircleArrowIcon direction="right" />
        </button>
      </div>
      <button
        onClick={onViewAll}
        className="text-[14px] text-[#9EA4B2] pr-4">
        전체보기
      </button>
    </div>
  )
}

export { MonthSelector }
