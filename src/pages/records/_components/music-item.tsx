interface MusicItemProps {
  albumArt?: string
  title: string
  artist: string
}

export function MusicItem({ albumArt, title, artist }: MusicItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 text-left transition-colors">
      {albumArt ? (
        <img
          src={albumArt}
          alt={title}
          className="size-[40px] shrink-0 rounded-md object-cover"
        />
      ) : (
        <div className="size-[40px] shrink-0 rounded-md bg-gray-200" />
      )}

      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate text-white text-sm">{title}</p>
        <p className="truncate text-gray-400 text-xs">{artist}</p>
      </div>
    </div>
  )
}
