import { useState } from 'react'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface RecordScrollListProps {
  records: { id: string }[]
  onRecordClick: (recordId: string) => void
}

function RecordScrollList({ records, onRecordClick }: RecordScrollListProps) {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null
  )

  const { ref: leftSentinelRef, isIntersecting: isLeftVisible } =
    useIntersectionObserver({ root: scrollContainer })
  const { ref: rightSentinelRef, isIntersecting: isRightVisible } =
    useIntersectionObserver({ root: scrollContainer })

  const showLeftFade = !isLeftVisible
  const showRightFade = !isRightVisible

  if (records.length === 0) {
    return (
      <div className="w-full h-[60px] flex items-center justify-center text-sm text-gray-300">
        기록을 하지 않았네요!
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        ref={setScrollContainer}
        className="overflow-x-scroll scrollbar-hide flex gap-2">
        <div
          ref={leftSentinelRef}
          className="shrink-0 w-px"
        />
        {records.map(record => (
          <button
            key={record.id}
            className="rounded-full size-20 bg-gray-200 shrink-0 cursor-pointer"
            onClick={() => onRecordClick(record.id)}
          />
        ))}
        <div
          ref={rightSentinelRef}
          className="shrink-0 w-px"
        />
      </div>
      <div
        className="absolute top-0 left-[-1px] h-full w-12 pointer-events-none transition-opacity duration-100"
        style={{
          opacity: showLeftFade ? 1 : 0,
          background:
            'linear-gradient(90deg, #1C1D23 0%, rgba(22, 23, 28, 0) 100%)'
        }}
      />
      <div
        className="absolute top-0 right-[-1px] h-full w-12 pointer-events-none transition-opacity duration-100"
        style={{
          opacity: showRightFade ? 1 : 0,
          background:
            'linear-gradient(270deg, #1C1D23 0%, rgba(22, 23, 28, 0) 100%)'
        }}
      />
    </div>
  )
}

export default RecordScrollList
