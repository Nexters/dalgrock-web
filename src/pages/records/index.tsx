import { Header } from '@/components/header'
import { useNavigate } from 'react-router-dom'
import { WeeklySectionLayout } from './_components/weekly-section-layout'
import RecordScrollList from './_components/record-scroll-list'
import { ArrowIcon } from '@/components/icons'
import { useMemo, useState } from 'react'
import { MonthSelector } from '../reports/_components/month-selector'

// NOTE: 월 주차별 기록 더미 데이터
interface Record {
  id: string
  title: string
  artist: string
  date: string
}

interface WeeklyRecords {
  week: number
  reportId: string
  records: Record[]
}

const MONTHLY_RECORDS: WeeklyRecords[] = [
  {
    week: 1,
    reportId: 'report-2026-01-w1',
    records: [
      {
        id: 'rec-001',
        title: 'APT.',
        artist: '로제 & 브루노 마스',
        date: '2026-01-01'
      },
      { id: 'rec-002', title: 'Whiplash', artist: 'aespa', date: '2026-01-02' },
      { id: 'rec-003', title: 'HAPPY', artist: 'DAY6', date: '2026-01-04' }
    ]
  },
  {
    week: 2,
    reportId: 'report-2026-01-w2',
    records: [
      {
        id: 'rec-004',
        title: 'Supernova',
        artist: 'aespa',
        date: '2026-01-06'
      },
      {
        id: 'rec-005',
        title: 'Love wins all',
        artist: 'IU',
        date: '2026-01-07'
      },
      {
        id: 'rec-006',
        title: 'Small girl',
        artist: '이영지',
        date: '2026-01-08'
      },
      { id: 'rec-007', title: 'Ditto', artist: 'NewJeans', date: '2026-01-09' },
      {
        id: 'rec-008',
        title: 'SPOT!',
        artist: '지코 & 제니',
        date: '2026-01-11'
      }
    ]
  },
  {
    week: 3,
    reportId: 'report-2026-01-w3',
    records: [
      { id: 'rec-009', title: 'Drama', artist: 'aespa', date: '2026-01-13' },
      { id: 'rec-010', title: 'OMG', artist: 'NewJeans', date: '2026-01-14' },
      { id: 'rec-011', title: '고민중독', artist: 'QWER', date: '2026-01-15' },
      {
        id: 'rec-012',
        title: 'Super Shy',
        artist: 'NewJeans',
        date: '2026-01-16'
      },
      { id: 'rec-013', title: '예뻤어', artist: 'DAY6', date: '2026-01-17' },
      {
        id: 'rec-014',
        title: 'Hype Boy',
        artist: 'NewJeans',
        date: '2026-01-18'
      },
      {
        id: 'rec-015',
        title: 'Welcome to the Show',
        artist: 'DAY6',
        date: '2026-01-19'
      }
    ]
  },
  {
    week: 4,
    reportId: 'report-2026-01-w4',
    records: []
  },
  {
    week: 5,
    reportId: 'report-2026-01-w5',
    records: [
      { id: 'rec-018', title: 'Kitsch', artist: 'IVE', date: '2026-01-27' },
      { id: 'rec-019', title: 'I AM', artist: 'IVE', date: '2026-01-28' },
      {
        id: 'rec-020',
        title: 'SHEESH',
        artist: 'BABYMONSTER',
        date: '2026-01-30'
      },
      {
        id: 'rec-021',
        title: 'Armageddon',
        artist: 'aespa',
        date: '2026-01-31'
      }
    ]
  }
]

function Records() {
  const navigate = useNavigate()
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(1)
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

  // TODO: 선택된 월의 주차별 기록 데이터 가져오는 API 요청

  const handleNavigateToReport = (reportId: string) => {
    navigate(`/reports/${reportId}`)
  }
  const handleNavigateToRecord = (recordId: string) => {
    navigate(`/records/${recordId}`)
  }

  // TODO: 해당 주차가 오늘 날짜가 포함된 주인지 확인하는 함수 추가

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center mb-5">
        <MonthSelector
          month={displayMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>

      {/* 주차별 기록 */}
      <div className="flex flex-col gap-6 px-3 pb-8">
        {MONTHLY_RECORDS.sort((a, b) => b.week - a.week).map(weeklyRecord => {
          const isEmpty = weeklyRecord.records.length === 0
          // TODO: 해당 주차가 오늘 날짜가 포함된 주인지 확인

          return (
            <WeeklySectionLayout key={weeklyRecord.week}>
              <div className="px-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-gray-0">
                  {isEmpty ? (
                    <p className="font-bold">{weeklyRecord.week}주차</p>
                  ) : (
                    <>
                      <p className="font-bold">
                        {weeklyRecord.week}주차 리포트
                      </p>

                      <button
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() =>
                          handleNavigateToReport(weeklyRecord.reportId)
                        }>
                        <ArrowIcon
                          direction="right"
                          height={24}
                          width={24}
                        />
                      </button>
                    </>
                  )}
                </div>

                <RecordScrollList
                  records={weeklyRecord.records}
                  onRecordClick={handleNavigateToRecord}
                />
              </div>
            </WeeklySectionLayout>
          )
        })}
      </div>
    </div>
  )
}

export { Records }
