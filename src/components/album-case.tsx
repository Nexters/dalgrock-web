import { cn } from '@/utils/cn'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

interface AlbumCaseProps {
  thumbnailUrl?: string
  className?: string
}

function AlbumCase({ thumbnailUrl, className }: AlbumCaseProps) {
  return (
    <div
      className={cn(
        'relative h-20 w-40 overflow-hidden rounded-2xl',
        className
      )}
      style={{
        maskImage:
          'radial-gradient(circle 25px at 50% 0, transparent 24px, black 25px)',
        WebkitMaskImage:
          'radial-gradient(circle 25px at 50% 0, transparent 24px, black 25px)'
      }}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 h-full w-full scale-150 object-cover blur-2xl"
        />
      )}
      <div
        className="absolute inset-0 backdrop-blur-[20px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          opacity: 0.3
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: '1px',
          background:
            'linear-gradient(90deg, rgba(137,237,196,0.3) 0%, rgba(137,237,196,0.02) 30%, rgba(137,237,196,0.1) 50%, rgba(137,237,196,0.3) 100%)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude'
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: NOISE_SVG }}
      />
    </div>
  )
}

export { AlbumCase }
