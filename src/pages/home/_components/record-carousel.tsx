import { Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import type { RecordItem } from '@/apis/generated/models'
import { AlbumCase } from '@/components/album-case'
import { cn } from '@/utils/cn'

interface RecordCarouselProps {
  records: RecordItem[]
  selectedIndex: number
  onIndexChange: (index: number) => void
  dateLabels: string[]
}

const ITEM_WIDTH = 203
const ITEM_GAP = 0

function RecordCarousel({
  records,
  selectedIndex,
  onIndexChange,
  dateLabels
}: RecordCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const containerWidth = el.clientWidth
    const scrollTarget =
      selectedIndex * (ITEM_WIDTH + ITEM_GAP) -
      (containerWidth - ITEM_WIDTH) / 2

    isScrollingRef.current = true
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' })

    const timeout = setTimeout(() => {
      isScrollingRef.current = false
    }, 400)

    return () => clearTimeout(timeout)
  }, [selectedIndex])

  function handleScroll() {
    const el = scrollRef.current
    if (!el || isScrollingRef.current) return

    const containerWidth = el.clientWidth
    const scrollLeft = el.scrollLeft
    const centerOffset = scrollLeft + containerWidth / 2

    const newIndex = Math.round(centerOffset / (ITEM_WIDTH + ITEM_GAP))
    const clampedIndex = Math.max(0, Math.min(records.length - 1, newIndex))

    if (clampedIndex !== selectedIndex) {
      onIndexChange(clampedIndex)
    }
  }

  const paddingX = `calc((100% - ${ITEM_WIDTH}px) / 2)`

  return (
    <div
      ref={scrollRef}
      className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      style={{ scrollSnapType: 'x mandatory' }}
      onScroll={handleScroll}>
      <div
        className="flex shrink-0"
        style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
        {records.map((record, index) => (
          <div
            key={index}
            className="w-[203px] shrink-0 snap-center"
            style={{ scrollSnapAlign: 'center' }}>
            <RecordItem
              record={record}
              dateLabel={dateLabels[index] ?? ''}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface RecordItemProps {
  record: RecordItem
  dateLabel: string
}

function RecordItem({ record, dateLabel }: RecordItemProps) {
  const hasRecord = !!record.recordId
  const thumbnails = (record.musics ?? [])
    .map(m => m.thumbnail)
    .filter((t): t is string => !!t)
    .slice(0, 3)
  const emotions = record.emotions ?? []
  const displayedEmotions = emotions.slice(0, 2)
  const remainingCount = emotions.length - 2

  const lastThumbnail = thumbnails[thumbnails.length - 1]

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[280px] w-[180px] items-center justify-center">
        {hasRecord && thumbnails.length > 0 ? (
          <Link
            to={`/records/${record.createdAt?.split('T')[0]}`}
            className="relative z-10 h-full w-full">
            <StackedAlbums thumbnails={thumbnails} />
          </Link>
        ) : (
          <Link
            to="/records/new"
            className="z-10 flex flex-col items-center">
            <div
              className="flex h-[148px] w-[148px] flex-col items-center justify-center rounded-full bg-[#262930]"
              style={{
                border: '1px dashed #9ea4b2'
              }}>
              <Plus className="h-6 w-6 text-white" />
              <span className="mt-1 text-[15px] font-bold leading-[22px] text-white">
                기록하기
              </span>
            </div>
          </Link>
        )}
        <AlbumCase
          thumbnailUrl={lastThumbnail}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      <span className="mt-2 text-sm leading-[21px] text-white">
        {dateLabel}
      </span>

      {hasRecord && emotions.length > 0 ? (
        <div className="mt-2 flex items-center gap-1">
          {displayedEmotions.map(emotion => (
            <span
              key={emotion}
              className="rounded-full bg-[#262930] px-[14px] py-2 text-sm leading-[20px] tracking-[-0.25px] text-white">
              {emotion}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-sm leading-[21px] text-[#9ea4b2]">
              외 {remainingCount}개
            </span>
          )}
        </div>
      ) : (
        <span className="mt-2 text-sm leading-[21px] text-white">
          아직 감정이 기록되지 않았어요
        </span>
      )}
    </div>
  )
}

function StackedAlbums({ thumbnails }: { thumbnails: string[] }) {
  return (
    <div className="relative h-full w-full">
      {thumbnails.map((thumb, i) => {
        const count = thumbnails.length
        const topOffset = i === 0 ? (count === 1 ? 40 : 0) : i * 64

        return (
          <img
            key={i}
            src={thumb}
            alt="앨범 커버"
            className={cn(
              'absolute left-0 h-[148px] w-[148px] rounded-full object-cover',
              i > 0 && 'border border-white/30'
            )}
            style={{
              top: topOffset,
              zIndex: count - i
            }}
          />
        )
      })}
    </div>
  )
}

export { RecordCarousel }
