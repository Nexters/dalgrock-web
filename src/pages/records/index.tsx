import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Header } from '@/components/header'
import { ArrowIcon } from '@/components/icons'
import { recordsQueries } from '@/apis/records/queries'
import { WeeklySectionLayout } from './_components/weekly-section-layout'
import RecordScrollList from './_components/record-scroll-list'
import { MonthSelector } from '../reports/_components/month-selector'

function Records() {
  const navigate = useNavigate()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const displayMonth = useMemo(() => {
    return `${String(year).slice(2)}년 ${month}월`
  }, [year, month])

  const { data: monthlyData, isLoading: isMonthlyLoading } = useQuery(
    recordsQueries.getMonthlyRecords({ year, month })
  )

  const weeklyRecords = monthlyData?.weekly ?? []

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

  const handleNavigateToReport = (reportId: string) => {
    navigate(`/reports/${reportId}`)
  }

  const handleNavigateToRecord = (recordId: number) => {
    navigate(`/records/${recordId}`)
  }

  return (
    <div>
      <Header onBack={() => navigate('/')} />

      <div className="flex items-center justify-center mb-5">
        <MonthSelector
          month={displayMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>

      {/* 주차별 기록 */}
      <div className="flex flex-col gap-6 px-3 pb-8">
        {isMonthlyLoading && (
          <div className="flex justify-center py-8">
            <div className="size-6 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
          </div>
        )}

        {!isMonthlyLoading &&
          [...weeklyRecords]
            .sort((a, b) => (b.week ?? 0) - (a.week ?? 0))
            .map(weeklyRecord => {
              const records = weeklyRecord.records ?? []
              const isEmpty = records.length === 0

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
                              handleNavigateToReport(
                                `report-${year}-${String(month).padStart(2, '0')}-w${weeklyRecord.week}`
                              )
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
                      records={records}
                      onRecordClick={handleNavigateToRecord}
                    />
                  </div>
                </WeeklySectionLayout>
              )
            })}

        {!isMonthlyLoading && weeklyRecords.length === 0 && (
          <div className="flex justify-center py-8">
            <p className="text-gray-400 text-sm">기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { Records }
