import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { PlaylistSection } from './_components/sections/playlist-section'
import { EmotionSummarySection } from './_components/sections/emotion-summary-section'
import { EmotionGenreSection } from './_components/sections/emotion-genre-section'
import { MomentAnalysisSection } from './_components/sections/moment-analysis-section'
import { ComparisonSection } from './_components/sections/comparison-section'
import { ArrowIcon } from '@/components/icons'
import { cn } from '@/utils/cn'
import {
  getMostFrequentCategory,
  EMOTION_CATEGORIES
} from './_components/emotion-constants'
import { reportsQueries } from '@/apis/reports/queries'
import { useMemo, useEffect } from 'react'

function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as {
    year?: number
    month?: number
    reportId?: number
  } | null
  const reportId = state?.reportId || 0

  const { month, week } = useMemo(() => {
    if (!id) return { month: 0, week: 0 }
    const parts = id.split('-')
    return {
      month: parseInt(parts[1]),
      week: parseInt(parts[2])
    }
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleGoBack = () => {
    if (state?.year && state?.month) {
      navigate('/reports', { state: { year: state.year, month: state.month } })
    } else {
      navigate('/reports')
    }
  }

  const { data: apiResponse } = useSuspenseQuery(
    reportsQueries.getReportDetail(reportId)
  )

  const report = useMemo(() => {
    if (!apiResponse) return null

    return {
      title: apiResponse.overallSummary?.title || '',
      tags: apiResponse.overallSummary?.summaryTags || [],
      tracks:
        apiResponse.weeklyPlaylist?.musics?.map((music, index) => ({
          id: String(index + 1),
          title: music.title,
          artist: music.artist,
          albumCover: music.thumbnail
        })) || [],
      emotionSummary: {
        title: apiResponse.weeklyEmotionSummary?.title || '',
        weekData: apiResponse.weeklyEmotionSummary?.emotions
          ? Object.entries(apiResponse.weeklyEmotionSummary.emotions).map(
              ([day, emotions]) => {
                const dayLabels: Record<string, string> = {
                  Mon: '월',
                  Tue: '화',
                  Wed: '수',
                  Thu: '목',
                  Fri: '금',
                  Sat: '토',
                  Sun: '일'
                }
                return {
                  day,
                  dayLabel: dayLabels[day] || day,
                  emotions
                }
              }
            )
          : []
      },
      emotionGenres:
        apiResponse.emotionGenreDescriptions?.map(item => ({
          emotion: item.emotion || '',
          genres: item.genres || [],
          albums: item.thumbnail || [],
          description: item.description || ''
        })) || [],
      moments:
        apiResponse.contextSummaries?.map(item => ({
          tag: item.value || '',
          albums: item.thumbnail || []
        })) || [],
      comparison: {
        emotion: apiResponse.weeklyComparison?.emotion || '',
        genre: apiResponse.weeklyComparison?.genre || '',
        nextWeekSuggestion:
          apiResponse.weeklyComparison?.nextWeekSuggestion || ''
      }
    }
  }, [apiResponse])

  const dominantCategory = useMemo(() => {
    if (!report) return null
    return getMostFrequentCategory(report.emotionSummary.weekData)
  }, [report])

  const backgroundTop = dominantCategory
    ? EMOTION_CATEGORIES[dominantCategory].backgroundTop
    : null
  const backgroundMiddle = dominantCategory
    ? EMOTION_CATEGORIES[dominantCategory].backgroundMiddle
    : null

  if (!report) return null

  return (
    <div className="min-h-dvh bg-gray-600 relative overflow-hidden">
      {backgroundTop && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: '70vh',
            backgroundImage: `url(${backgroundTop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      {backgroundMiddle && (
        <div
          className="absolute left-0 right-0 pointer-events-none z-0"
          style={{
            top: '80vh',
            height: '80vh',
            backgroundImage: `url(${backgroundMiddle})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      <div className="relative z-10">
        <header className="sticky top-0 z-10 flex h-15 items-center">
          <div
            className="absolute inset-0 pointer-events-none
            bg-[linear-gradient(180deg,rgba(22,23,28,1)_0%,rgba(22,23,28,0)_100%)]
            backdrop-blur-[10px]"
          />

          <div className="relative z-10 flex flex-1 justify-start">
            <button onClick={handleGoBack}>
              <ArrowIcon />
            </button>
          </div>

          <div className="relative z-10 shrink-0 px-2">
            <div className="text-white text-lg leading-6 font-normal">
              {month}월 {week}주차
            </div>
          </div>

          <div className="relative z-10 flex flex-1 justify-end" />
        </header>

        <div className="pt-[23px] px-5 pb-[30px]">
          <h1 className="text-2xl font-bold text-white mb-3">{report.title}</h1>
          <div className="flex flex-wrap gap-2">
            {report.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  'rounded-full px-2.5 py-1 text-white border border-white/15 bg-white/10 backdrop-blur-[14px]',
                  'shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]',
                  'text-[14px] font-medium'
                )}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <PlaylistSection tracks={report.tracks} />
        <EmotionSummarySection
          title={report.emotionSummary.title}
          weekData={report.emotionSummary.weekData}
        />
        <EmotionGenreSection data={report.emotionGenres} />
        <MomentAnalysisSection moments={report.moments} />
        <ComparisonSection
          emotion={report.comparison.emotion}
          genre={report.comparison.genre}
          nextWeekSuggestion={report.comparison.nextWeekSuggestion}
        />
      </div>
    </div>
  )
}

export { ReportDetail }
