interface MusicItemProps {
  // imgUrl: string
  title: string
  artist: string
}

export function MusicItem({ title, artist }: MusicItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 text-left transition-colors">
      {/* NOTE: 임시 앨범 아트 플레이스홀더 */}
      {/* <img
        src={imgUrl}
        alt={title}
      /> */}
      <div className="size-[40px] shrink-0 rounded-md bg-gray-200" />

      <div className="flex flex-col gap-1">
        <p className="truncate text-white text-sm">{title}</p>
        <p className="truncate text-gray-400 text-xs">{artist}</p>
      </div>
    </div>
  )
}
