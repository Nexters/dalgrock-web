import { CircleArrowIcon } from '@/components/icons/circle-arrow'

interface MonthSelectorProps {
  month: string
  onPrevMonth: () => void
  onNextMonth: () => void
}

function MonthSelector({
  month,
  onPrevMonth,
  onNextMonth
}: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-3">
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
  )
}

export { MonthSelector }
