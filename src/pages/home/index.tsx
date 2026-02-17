import { useQuery } from '@tanstack/react-query'

import type { RecordItem } from '@/apis/generated/models'
import { recordsQueries } from '@/apis/records/queries'

import { HeroSection } from './_components/hero-section'
import { HomeTabs } from './_components/home-tabs'
import { TodayRecord } from './_components/today-record'
import {
  WeeklyRecordSection,
  type WeeklyRecordItem
} from './_components/weekly-record-grid'

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

function getMonday(): Date {
  const now = new Date()
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  return monday
}

function formatTodayDate(): string {
  const now = new Date()
  return `${now.getMonth() + 1}월 ${now.getDate()}일`
}

function getWeekLabel(): string {
  const monday = getMonday()
  const month = monday.getMonth() + 1
  const weekOfMonth = Math.ceil(monday.getDate() / 7)
  return `${month}월 ${weekOfMonth}주차`
}

function toWeeklyRecordItems(records: RecordItem[]): WeeklyRecordItem[] {
  const monday = getMonday()

  return records.map((record, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    const dateStr = date.toISOString().split('T')[0]

    return {
      date: dateStr,
      dayLabel: DAY_LABELS[index],
      dateLabel: `${date.getMonth() + 1}/${date.getDate()}`,
      hasRecord: !!record.recordId,
      albumImage: record.musics?.[0]?.thumbnail
    }
  })
}

function Home() {
  const {
    data: weeklySlotData,
    isLoading,
    isError
  } = useQuery(recordsQueries.getWeeklySlotRecords())

  const records = weeklySlotData?.records ?? []
  const todayRecord = records.find(r => r.isToday)
  const hasRecord = !!todayRecord?.recordId

  if (isLoading) {
    return (
      <div className="relative min-h-dvh bg-gray-600">
        <HomeTabs />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="relative min-h-dvh bg-gray-600">
        <HomeTabs />
        <div className="flex items-center justify-center pt-20">
          <p className="text-white">데이터를 불러오지 못했습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh bg-gray-600">
      <HomeTabs />

      <HeroSection hasRecord={hasRecord} />

      <TodayRecord
        date={formatTodayDate()}
        hasRecord={hasRecord}
        albumImage={todayRecord?.musics?.[0]?.thumbnail}
        emotions={todayRecord?.emotions}
      />

      <WeeklyRecordSection
        weekLabel={getWeekLabel()}
        records={toWeeklyRecordItems(records)}
      />
    </div>
  )
}

export { Home }
