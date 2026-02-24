import { cn } from '@/utils/cn'

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

interface DaySelectorProps {
  selectedIndex: number
  onSelect: (index: number) => void
}

function DaySelector({ selectedIndex, onSelect }: DaySelectorProps) {
  return (
    <div className="flex justify-between px-5 py-3">
      {DAY_LABELS.map((label, index) => {
        const isSelected = index === selectedIndex

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'flex w-10 flex-col items-center gap-1 rounded-[8px] py-1',
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
          </button>
        )
      })}
    </div>
  )
}

export { DaySelector }
