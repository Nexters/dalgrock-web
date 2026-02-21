import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { RecordItem } from '@/apis/generated/models'
import { recordsQueries } from '@/apis/records/queries'

import { DaySelector } from './_components/day-selector'
import { HeroSection } from './_components/hero-section'
import { HomeTabs } from './_components/home-tabs'
import { RecordCarousel } from './_components/record-carousel'
import { ReportCTA } from './_components/report-cta'

function getMonday(): Date {
  const now = new Date()
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  return monday
}

function getTodayDayIndex(): number {
  const day = new Date().getDay()
  return day === 0 ? 6 : day - 1
}

function getDaysUntilSunday(): number {
  const day = new Date().getDay()
  return day === 0 ? 0 : 7 - day
}

function getDateLabels(records: RecordItem[]): string[] {
  const monday = getMonday()
  return records.map((_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  })
}

function Home() {
  const [selectedDay, setSelectedDay] = useState(getTodayDayIndex())

  const {
    data: weeklySlotData,
    isLoading,
    isError
  } = useQuery(recordsQueries.getWeeklySlotRecords())

  const records = weeklySlotData?.records ?? []
  const hasRecordByDay = records.map(r => !!r.recordId)
  const dateLabels = getDateLabels(records)
  const daysUntilReport = getDaysUntilSunday()
  const isReportReady = daysUntilReport === 0

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

      <HeroSection />

      <DaySelector
        selectedIndex={selectedDay}
        hasRecordByDay={hasRecordByDay}
        onSelect={setSelectedDay}
      />

      <RecordCarousel
        records={records}
        selectedIndex={selectedDay}
        onIndexChange={setSelectedDay}
        dateLabels={dateLabels}
      />

      <ReportCTA
        isReportReady={isReportReady}
        daysUntilReport={daysUntilReport}
      />
    </div>
  )
}

export { Home }
