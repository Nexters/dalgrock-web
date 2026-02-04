import type { ReactNode } from 'react'
import { ArrowIcon } from './icons'
import { useNavigate } from 'react-router-dom'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { cn } from '@/utils/cn'

interface HeaderProps {
  onBack?: () => void
  showBackButton?: boolean
  leftChild?: ReactNode
  midChild?: ReactNode
  rightChild?: ReactNode
}

export function Header({
  onBack,
  showBackButton = true,
  leftChild,
  midChild,
  rightChild
}: HeaderProps) {
  const navigate = useNavigate()
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver()
  const isScrolled = !isIntersecting

  const handleGoBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute top-0 h-px"
      />
      <header
        className={cn(
          'sticky top-0 z-10 flex h-15 items-center px-4 py-2 transition-colors duration-200',
          isScrolled ? 'bg-[#16171C1A] backdrop-blur-[20px]' : 'bg-gray-600'
        )}>
        <div className="flex flex-1 justify-start">
          {showBackButton ? (
            <button onClick={handleGoBack}>
              <ArrowIcon />
            </button>
          ) : (
            leftChild
          )}
        </div>
        <div className="shrink-0 px-2">{midChild}</div>
        <div className="flex flex-1 justify-end">{rightChild}</div>
      </header>
    </>
  )
}
