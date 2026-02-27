import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { HomeTabs } from '../home/_components/home-tabs'
import { MonthSelector } from './_components/month-selector'
import { WeeklyReportCard } from './_components/weekly-report-card'
import { EmptyState } from './_components/empty-state'
import { reportsQueries } from '@/apis/reports/queries'
import type { EmotionCategory } from './_components/emotion-constants'

interface WeeklyReport {
  week: number
  reportId?: number
  recordCount: number
  isAnalyzing: boolean
  title?: string
  tags?: string[]
  emotionCategory?: EmotionCategory
  representativeThumbnail?: string
  thumbnails?: string[]
}

function getEmotionCategoryFromEmotions(
  emotions?: string[]
): EmotionCategory | undefined {
  if (!emotions || emotions.length === 0) return undefined

  const emotionMap: Record<string, EmotionCategory> = {
    행복: 'exciting',
    설렘: 'exciting',
    슬픔: 'calm',
    그리움: 'calm',
    사랑: 'complex',
    복잡미묘: 'complex',
    감사: 'warm',
    따뜻함: 'warm',
    불안: 'sharp',
    긴장: 'sharp',
    평온: 'calm',
    위로: 'calm'
  }

  for (const emotion of emotions) {
    if (emotionMap[emotion]) {
      return emotionMap[emotion]
    }
  }

  return 'calm'
}

function Reports() {
  const navigate = useNavigate()
  const location = useLocation()

  const now = new Date()
  const state = location.state as { year?: number; month?: number } | null
  const [year, setYear] = useState(state?.year || now.getFullYear())
  const [month, setMonth] = useState(state?.month || now.getMonth() + 1)

  const monthKey = useMemo(() => {
    return `${year}-${String(month).padStart(2, '0')}`
  }, [year, month])

  const { data: apiResponse } = useSuspenseQuery(
    reportsQueries.getMonthlyReports({ year, month })
  )

  const currentReports = useMemo(() => {
    if (!apiResponse?.weekly) return []

    return apiResponse.weekly.map(weekData => {
      const isAnalyzing = weekData.status === 'ANALYZING'

      return {
        week: weekData.week ?? 0,
        reportId: weekData.reportId,
        recordCount: weekData.recordCount ?? 0,
        isAnalyzing,
        title: weekData.title,
        tags: weekData.emotions,
        emotionCategory: getEmotionCategoryFromEmotions(weekData.emotions),
        representativeThumbnail: weekData.representativeThumbnail,
        thumbnails: weekData.thumbnails
      } as WeeklyReport
    })
  }, [apiResponse])

  const displayMonth = useMemo(() => {
    return `${String(year).slice(2)}년 ${month}월`
  }, [year, month])

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  const handleReportClick = (
    ym: string,
    week: number,
    isAnalyzing: boolean,
    reportId?: number
  ) => {
    if (isAnalyzing) return
    navigate(`/reports/${ym}-${week}`, {
      state: { year, month, reportId }
    })
  }

  return (
    <div className="min-h-dvh bg-gray-600">
      <HomeTabs />

      <div className="flex items-center justify-center px-5 py-5">
        <MonthSelector
          month={displayMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>

      <div className="flex flex-col gap-4 px-5 pb-6">
        {currentReports.length > 0 ? (
          currentReports.map((report: WeeklyReport) => (
            <WeeklyReportCard
              key={report.week}
              month={month}
              week={report.week}
              recordCount={report.recordCount}
              isAnalyzing={report.isAnalyzing}
              title={report.title}
              tags={report.tags}
              emotionCategory={report.emotionCategory}
              representativeThumbnail={report.representativeThumbnail}
              thumbnails={report.thumbnails}
              onClick={() =>
                handleReportClick(
                  monthKey,
                  report.week,
                  report.isAnalyzing,
                  report.reportId
                )
              }
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export { Reports }
