import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { RecordItem } from '@/apis/generated/models'
import { recordsQueries } from '@/apis/records/queries'

import { DaySelector } from './_components/day-selector'
import { HeroSection } from './_components/hero-section'
import { HomeTabs } from './_components/home-tabs'
import { RecordCarousel } from './_components/record-carousel'
import { ReportCTA } from './_components/report-cta'
import { reportsQueries } from '@/apis/reports/queries'
import { MoreRecords } from './_components/more-records'

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

function getWeekDates(records: RecordItem[]): string[] {
  const monday = getMonday()
  return records.map((_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  })
}

function getDateLabels(dates: string[]): string[] {
  return dates.map(iso => {
    const date = new Date(iso)
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

  const { data: monthlyReportData } = useQuery(
    reportsQueries.getMonthlyReports({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    })
  )

  const records = weeklySlotData?.records ?? []
  const weekDates = getWeekDates(records)
  const dateLabels = getDateLabels(weekDates)
  const daysUntilReport = getDaysUntilSunday()
  const isReportReady =
    daysUntilReport === 0 && !!monthlyReportData?.weekly?.length

  if (isLoading) {
    return (
      <div className="flex min-h-dvh flex-col bg-gray-600">
        <HomeTabs />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-dvh flex-col bg-gray-600">
        <HomeTabs />
        <div className="flex items-center justify-center pt-20">
          <p className="text-white">데이터를 불러오지 못했습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gray-600">
      <HomeTabs />

      <HeroSection />

      <DaySelector
        selectedIndex={selectedDay}
        onSelect={setSelectedDay}
      />

      <RecordCarousel
        records={records}
        selectedIndex={selectedDay}
        onIndexChange={setSelectedDay}
        dates={weekDates}
        dateLabels={dateLabels}
      />

      <MoreRecords />

      <ReportCTA
        isReportReady={isReportReady}
        daysUntilReport={daysUntilReport}
      />
    </div>
  )
}

export { Home }
