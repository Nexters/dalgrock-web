import { useRef, useState, useEffect } from 'react'
import { AlbumCase } from '@/components/album-case'

interface Track {
  id: string
  title: string
  artist: string
  albumCover?: string
}

interface PlaylistSectionProps {
  tracks: Track[]
}

function PlaylistSection({ tracks }: PlaylistSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [centerIndex, setCenterIndex] = useState(0)

  const SLOT = 128
  const GAP = 5
  const PEEK = 10

  const BIG = 140
  const SMALL = 80

  const SLOT_H = 188

  const ORB_CENTER_Y = 64
  const TEXT_TOP = 144

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const slotHalf = SLOT / 2
    const slotWidth = SLOT + GAP

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth

      const leftPadding = containerWidth / 2 - slotHalf - PEEK

      const centerXInContent = scrollLeft + containerWidth / 2 - leftPadding

      const index = Math.round((centerXInContent - slotHalf) / slotWidth)

      setCenterIndex(Math.max(0, Math.min(index, tracks.length - 1)))
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [tracks.length, SLOT, GAP, PEEK])

  return (
    <div className="py-[30px]">
      <div className="px-5 mb-6 z-10 relative">
        <div className="text-sm font-base text-[#C8CED8] mb-1">
          이번 주 플레이리스트
        </div>
        <p className="text-xl font-bold text-white mb-6">
          {tracks.length}곡과 함께했어요
        </p>
      </div>

      <div
        ref={scrollRef}
        className="pt-4 overflow-x-scroll overflow-y-hidden scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          touchAction: 'pan-x',
          overscrollBehaviorY: 'contain'
        }}>
        <div
          className="flex w-max"
          style={{
            gap: `${GAP}px`,
            paddingLeft: `calc(50% - ${SLOT / 2}px - ${PEEK}px)`,
            paddingRight: `calc(50% - ${SLOT / 2}px - ${PEEK}px)`
          }}>
          {tracks.map((track, index) => {
            const isCenterItem = index === centerIndex
            const size = isCenterItem ? BIG : SMALL
            const orbTop = ORB_CENTER_Y - size / 2

            return (
              <div
                key={track.id}
                className="relative flex-shrink-0"
                style={{
                  scrollSnapAlign: 'center',
                  width: SLOT,
                  height: SLOT_H
                }}>
                <div
                  className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                  style={{ top: orbTop }}>
                  <div
                    className="rounded-full bg-gray-500 overflow-hidden transition-all duration-300"
                    style={{
                      width: size,
                      height: size,
                      boxShadow: isCenterItem
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                        : 'none'
                    }}>
                    {track.albumCover ? (
                      <img
                        src={track.albumCover}
                        alt={track.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 select-none">
                        album
                      </div>
                    )}
                  </div>

                  {isCenterItem && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
                      <AlbumCase />
                    </div>
                  )}
                </div>

                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[160px] text-center select-none pointer-events-none"
                  style={{ top: TEXT_TOP }}>
                  {isCenterItem && (
                    <>
                      <p className="text-white font-bold truncate">
                        {track.title}
                      </p>
                      <p className="text-gray-300 text-sm truncate">
                        {track.artist}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { PlaylistSection }
