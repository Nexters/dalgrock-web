import useEmblaCarousel from 'embla-carousel-react'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
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

function RecordCarousel({
  records,
  selectedIndex,
  onIndexChange,
  dateLabels
}: RecordCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    startIndex: selectedIndex
  })

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.scrollTo(selectedIndex)
  }, [emblaApi, selectedIndex])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      onIndexChange(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onIndexChange])

  return (
    <div
      className="overflow-hidden"
      ref={emblaRef}>
      <div className="flex touch-pan-y">
        {records.map((record, index) => (
          <div
            key={index}
            className="min-w-0 flex-[0_0_203px]">
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
