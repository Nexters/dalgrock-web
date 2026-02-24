import { CloseCircleIcon } from '@/components/icons'
import type { Music } from '@/types/record'
import { cn } from '@/utils/cn'

interface SelectedMusicItemProps extends Music {
  transparent?: boolean
  border?: boolean
  onRemove?: () => void
}

export function SelectedMusicItem({
  title,
  artist,
  albumArt,
  transparent = false,
  border = false,
  onRemove
}: SelectedMusicItemProps) {
  const content = (
    <div
      className={cn(
        'flex min-w-[180px] shrink-0 only:w-full only:shrink items-center gap-3 py-[10px] px-3 text-left transition-colors',
        border ? 'rounded-[7px]' : 'rounded-lg',
        transparent ? 'bg-transparent' : 'bg-gray-600'
      )}>
      {albumArt ? (
        <img
          src={albumArt}
          alt={title}
          className="size-7 shrink-0 rounded-md object-cover"
        />
      ) : (
        <div className="size-7 shrink-0 rounded-md bg-gray-200" />
      )}

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

  if (border) {
    return (
      <div className="rounded-[8px] bg-gradient-to-r from-white/10 to-white/5 p-[1px]">
        {content}
      </div>
    )
  }

  return content
}
