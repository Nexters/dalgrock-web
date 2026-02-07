import { CloseCircleIcon } from '@/components/icons'
import type { Music } from '..'
import { cn } from '@/utils/cn'

interface SelectedMusicItemProps extends Music {
  transparent?: boolean
  onRemove?: () => void
}

export function SelectedMusicItem({
  title,
  artist,
  transparent = false,
  onRemove
}: SelectedMusicItemProps) {
  return (
    <div
      className={cn(
        'flex min-w-[180px] shrink-0 only:w-full only:shrink items-center gap-3 rounded-lg py-[10px] px-3 text-left transition-colors',
        transparent ? 'bg-transparent' : 'bg-gray-600'
      )}>
      <div className="size-7 shrink-0 rounded-md bg-gray-200" />

      <div className="min-w-0 flex-1 flex flex-col text-left">
        <p className="truncate text-white text-[12px]">{title}</p>
        <p className="truncate text-gray-400 text-[10px]">{artist}</p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0">
        <CloseCircleIcon
          height={16}
          width={16}
        />
      </button>
    </div>
  )
}
