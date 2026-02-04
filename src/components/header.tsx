import type { ReactNode } from 'react'
import { ArrowIcon } from './icons'
import { useNavigate } from 'react-router-dom'

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

  const handleGoBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header className="sticky top-0 z-10 flex h-15 items-center bg-gray-600 px-4 py-2">
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
  )
}
