import { Link } from 'react-router-dom'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface WeeklyRecordItem {
  date: string
  dayLabel: string
  dateLabel: string
  hasRecord: boolean
  albumImage?: string
}

interface WeeklyRecordSectionProps {
  weekLabel: string
  records: WeeklyRecordItem[]
}

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

function WeeklyRecordSection({ weekLabel, records }: WeeklyRecordSectionProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-5 pb-4">
        <span className="text-sm font-bold tracking-[-0.4px] text-white">
          {weekLabel}
        </span>
        <Link
          to="/records"
          className="text-sm font-medium tracking-[-0.4px] text-[#9EA4B2]">
          전체보기
        </Link>
      </div>

      <div className="relative">
        <ScrollArea className="w-full">
          <div className="flex gap-4 px-5 pb-4">
            {records.map((record, index) => (
              <Link
                key={record.date}
                to={
                  record.hasRecord ? `/records/${record.date}` : '/records/new'
                }
                className="flex flex-col items-center gap-2">
                <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#262930]">
                  {record.hasRecord && record.albumImage ? (
                    <img
                      src={record.albumImage}
                      alt="앨범 커버"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-[#6B7181]">
                      {record.dateLabel}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-[#6B7181]">
                  {DAY_LABELS[index] || record.dayLabel}
                </span>
              </Link>
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
            className="invisible"
          />
        </ScrollArea>

        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-600 to-transparent" />
      </div>
    </div>
  )
}

export { WeeklyRecordSection }
export type { WeeklyRecordItem }
