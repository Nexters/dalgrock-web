import type { ReactNode } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  showBackButton?: boolean
  leftChild?: ReactNode
  midChild?: ReactNode
  rightChild?: ReactNode
}

export function Header({
  showBackButton = true,
  leftChild,
  midChild,
  rightChild
}: HeaderProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <header className="flex h-12 items-center px-4">
      <div className="flex flex-1 justify-start">
        {showBackButton ? (
          <button onClick={handleGoBack}>
            <ArrowLeftIcon className="size-4" />
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
