import { HeroSection } from './_components/hero-section'
import { HomeTabs } from './_components/home-tabs'
import { TodayRecord } from './_components/today-record'
import {
  WeeklyRecordSection,
  type WeeklyRecordItem
} from './_components/weekly-record-grid'

const mockWeeklyRecords: WeeklyRecordItem[] = [
  { date: '2025-02-03', dayLabel: '월', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-04', dayLabel: '화', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-05', dayLabel: '수', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-06', dayLabel: '목', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-07', dayLabel: '금', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-08', dayLabel: '토', dateLabel: 'NN/NN', hasRecord: false },
  { date: '2025-02-09', dayLabel: '일', dateLabel: 'NN/NN', hasRecord: false }
]

function Home() {
  const hasRecord = false

  return (
    <div className="relative min-h-dvh bg-gray-600">
      <HomeTabs />

      <HeroSection hasRecord={hasRecord} />

      <TodayRecord
        date="1월 22일"
        hasRecord={hasRecord}
        albumName="NNNNNNNNNN"
      />

      <WeeklyRecordSection
        weekLabel="2월 1주차"
        records={mockWeeklyRecords}
      />
    </div>
  )
}

export { Home }
