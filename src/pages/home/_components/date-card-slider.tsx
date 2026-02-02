import { Link } from 'react-router-dom'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/utils/cn'

interface DateCard {
  date: string
  label: string
  hasRecord: boolean
}

const mockCards: DateCard[] = [
  { date: '2025-01-19', label: '1월 19일', hasRecord: true },
  { date: '2025-01-20', label: '1월 20일', hasRecord: false },
  { date: '2025-01-21', label: '1월 21일', hasRecord: false }
]

function DateCardSlider() {
  return (
    <ScrollArea className="w-full py-6">
      <div className="flex gap-4 px-[14px]">
        {mockCards.map(card => (
          <div
            key={card.date}
            className="flex flex-col items-center gap-3">
            <Link
              to={card.hasRecord ? `/records/${card.date}` : '/records/new'}
              className={cn(
                'flex h-[232px] w-[232px] flex-shrink-0 items-center justify-center rounded-full',
                card.hasRecord ? 'bg-gray-400' : 'bg-gray-500'
              )}>
              {!card.hasRecord && (
                <span className="text-[15px] font-bold text-white">
                  기록하기
                </span>
              )}
            </Link>
            <span className="text-sm text-white">{card.label}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export { DateCardSlider }
