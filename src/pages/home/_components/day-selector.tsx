import { cn } from '@/utils/cn'

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

interface DaySelectorProps {
  selectedIndex: number
  hasRecordByDay: boolean[]
  onSelect: (index: number) => void
}

function DaySelector({
  selectedIndex,
  hasRecordByDay,
  onSelect
}: DaySelectorProps) {
  return (
    <div className="flex justify-between px-5 py-3">
      {DAY_LABELS.map((label, index) => {
        const isSelected = index === selectedIndex
        const hasRecord = hasRecordByDay[index] ?? false

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'flex w-10 flex-col items-center gap-1 rounded-lg py-1',
              isSelected ? 'bg-[#3f424d]' : 'bg-[#262930]'
            )}>
            <span
              className={cn(
                'text-xs leading-[18px]',
                isSelected
                  ? 'font-bold text-white'
                  : 'font-normal text-[#9ea4b2]'
              )}>
              {label}
            </span>
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                hasRecord ? 'bg-[#a1d952]' : 'bg-[#6b7181]'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export { DaySelector }
