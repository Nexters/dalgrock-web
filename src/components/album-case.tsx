import { cn } from '@/utils/cn'

interface AlbumCaseProps {
  thumbnailUrl?: string
  className?: string
}

function AlbumCase({ thumbnailUrl, className }: AlbumCaseProps) {
  return (
    <div
      className={cn(
        'relative h-[88px] w-[180px] overflow-hidden rounded-2xl',
        className
      )}
      style={{
        maskImage:
          'radial-gradient(circle 28px at 50% 0, transparent 27px, black 28px)',
        WebkitMaskImage:
          'radial-gradient(circle 28px at 50% 0, transparent 27px, black 28px)'
      }}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 h-full w-full scale-150 object-cover blur-2xl"
        />
      )}
      <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-sm" />
    </div>
  )
}

export { AlbumCase }
