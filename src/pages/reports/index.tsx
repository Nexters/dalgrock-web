import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeTabs } from '../home/_components/home-tabs'
import { MonthSelector } from './_components/month-selector'
import { WeeklyReportCard } from './_components/weekly-report-card'
import { EmptyState } from './_components/empty-state'

interface WeeklyReport {
  week: number
  recordCount: number
  isAnalyzing?: boolean
  title?: string
  tags?: string[]
}

type MonthlyReports = Record<string, WeeklyReport[]>

const MOCK_DATA: MonthlyReports = {
  '2026-01': [
    {
      week: 4,
      recordCount: 3,
      isAnalyzing: true,
      title: '센치했던 이번 주, 어쿠스틱과 함께했어요 🎵',
      tags: ['위로', '전환']
    },
    {
      week: 3,
      recordCount: 3,
      title: '활기찼던 한 주, 밝은 음악과 함께했어요 ☀️',
      tags: ['행복', '설렘']
    },
    {
      week: 2,
      recordCount: 5,
      title: '감성적인 한 주, 발라드와 함께했어요 🌙',
      tags: ['슬픔', '그리움']
    },
    {
      week: 1,
      recordCount: 4,
      title: '활동적인 한 주, 신나는 음악과 함께했어요 🎉',
      tags: ['즐거움', '자유']
    }
  ],
  '2025-12': [
    {
      week: 5,
      recordCount: 2,
      title: '따뜻한 연말, 캐롤과 함께했어요 🎄',
      tags: ['행복', '설렘']
    },
    {
      week: 4,
      recordCount: 4,
      title: '바쁜 한 주, 경쾌한 음악으로 힘냈어요 💪',
      tags: ['활력', '집중']
    },
    {
      week: 3,
      recordCount: 3,
      title: '차분했던 한 주, 잔잔한 음악과 함께했어요 ☕',
      tags: ['평온', '위로']
    }
  ],
  '2025-10': [
    {
      week: 2,
      recordCount: 3,
      title: '가을 감성, 어쿠스틱과 함께했어요 🍂',
      tags: ['감성', '그리움']
    },
    {
      week: 1,
      recordCount: 2,
      title: '시원한 가을 날씨, 팝송으로 시작했어요 🌤️',
      tags: ['상쾌함', '자유']
    }
  ]
}

function Reports() {
  const navigate = useNavigate()
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(1)

  const monthKey = useMemo(() => {
    return `${year}-${String(month).padStart(2, '0')}`
  }, [year, month])

  const currentReports = useMemo(() => {
    return MOCK_DATA[monthKey] || []
  }, [monthKey])

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

  const handleViewAll = () => {
    console.log('전체보기')
  }

  const handleReportClick = (ym: string, week: number) => {
    navigate(`/reports/${ym}-${week}`)
  }

  return (
    <div className="min-h-dvh bg-gray-600">
      <HomeTabs />

      <div className="flex items-center justify-between px-5 py-5 ml-4">
        <MonthSelector
          month={displayMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <button
          onClick={handleViewAll}
          className="text-[14px] text-[#9EA4B2] pr-4">
          전체보기
        </button>
      </div>

      <div className="flex flex-col gap-4 px-5 pb-6">
        {currentReports.length > 0 ? (
          currentReports.map(report => (
            <WeeklyReportCard
              key={report.week}
              month={month}
              week={report.week}
              recordCount={report.recordCount}
              isAnalyzing={report.isAnalyzing}
              title={report.title}
              tags={report.tags}
              onClick={() => handleReportClick(monthKey, report.week)}
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
