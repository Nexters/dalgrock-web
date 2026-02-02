import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

interface RecordItem {
  date: string
  label: string
  hasRecord: boolean
}

interface WeeklyRecordGridProps {
  title: string
  count: number
  records: RecordItem[]
  isBoldTitle?: boolean
}

function WeeklyRecordGrid({
  title,
  count,
  records,
  isBoldTitle = false
}: WeeklyRecordGridProps) {
  return (
    <div className="px-[14px]">
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            'text-sm tracking-tight text-white',
            isBoldTitle ? 'font-bold' : 'font-medium'
          )}>
          {title}
        </span>
        <span className="text-sm font-extrabold tracking-tight text-white">
          {count}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {records.map(record => (
          <Link
            key={record.date}
            to={record.hasRecord ? `/records/${record.date}` : '/records/new'}
            className={cn(
              'flex h-[74px] w-[74px] items-center justify-center rounded-full',
              record.hasRecord ? 'bg-gray-400' : 'bg-gray-500'
            )}>
            {!record.hasRecord && (
              <span className="text-sm font-medium tracking-tight text-gray-300">
                {record.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

const thisWeekRecords: RecordItem[] = [
  { date: '2025-01-13', label: '1월 13일', hasRecord: true },
  { date: '2025-01-14', label: '1월 14일', hasRecord: true },
  { date: '2025-01-15', label: '1월 15일', hasRecord: true },
  { date: '2025-01-16', label: '1월 16일', hasRecord: true },
  { date: '2025-01-17', label: '1월 17일', hasRecord: false },
  { date: '2025-01-18', label: '1월 18일', hasRecord: true },
  { date: '2025-01-19', label: '1월 19일', hasRecord: false },
  { date: '2025-01-20', label: '1월 20일', hasRecord: false }
]

const lastWeekRecords: RecordItem[] = [
  { date: '2025-01-06', label: '1월 6일', hasRecord: true },
  { date: '2025-01-07', label: '1월 7일', hasRecord: true },
  { date: '2025-01-08', label: '1월 8일', hasRecord: true },
  { date: '2025-01-09', label: '1월 9일', hasRecord: true },
  { date: '2025-01-10', label: '1월 10일', hasRecord: true },
  { date: '2025-01-11', label: '1월 11일', hasRecord: true },
  { date: '2025-01-12', label: '1월 12일', hasRecord: true }
]

function WeeklyRecordSection() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <WeeklyRecordGrid
        title="이번주"
        count={5}
        records={thisWeekRecords}
        isBoldTitle
      />
      <WeeklyRecordGrid
        title="1월 3주차"
        count={7}
        records={lastWeekRecords}
      />
      <WeeklyRecordGrid
        title="1월 2주차"
        count={7}
        records={lastWeekRecords}
      />
    </div>
  )
}

export { WeeklyRecordGrid, WeeklyRecordSection }
