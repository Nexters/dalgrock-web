import { AddedIcon, NotAddedIcon } from '@/components/icons'
import type { Music } from '..'

interface SearchedMusicItemProps extends Music {
  isSelected?: boolean
  onClick?: () => void
}

export function SearchedMusicItem({
  title,
  artist,
  isSelected = false,
  onClick
}: SearchedMusicItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg py-3 px-5 text-left transition-colors">
      {/* NOTE: 앨범 아트 플레이스홀더 */}
      <div className="size-[46px] shrink-0 rounded-md bg-gray-200" />

      <div className="min-w-0 flex-1 flex flex-col text-left">
        <p className="truncate font-medium text-white text-[15px]">{title}</p>
        <p className="truncate text-gray-400 text-[14px]">{artist}</p>
      </div>

      {isSelected ? (
        <AddedIcon
          height={24}
          width={24}
        />
      ) : (
        <NotAddedIcon
          height={24}
          width={24}
        />
      )}
    </button>
  )
}
