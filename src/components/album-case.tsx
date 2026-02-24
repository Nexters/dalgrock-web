import { cn } from '@/utils/cn'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const GRADIENT_STROKE =
  'linear-gradient(90deg, rgba(137,237,196,0.3) 0%, rgba(137,237,196,0.02) 30%, rgba(137,237,196,0.1) 50%, rgba(137,237,196,0.3) 100%)'

const STROKE_MASK_STYLE: React.CSSProperties = {
  padding: '1px',
  background: GRADIENT_STROKE,
  WebkitMask:
    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'destination-out',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude'
}

interface AlbumCaseProps {
  className?: string
}

const NOTCH_MASK =
  'radial-gradient(circle 25px at 50% 0, transparent 24px, black 25px)'

function AlbumCase({ className }: AlbumCaseProps) {
  return (
    <div
      className={cn(
        'relative h-20 w-40 overflow-hidden z-10 backdrop-blur-[3px]',
        className
      )}
      style={{
        maskImage: NOTCH_MASK,
        WebkitMaskImage: NOTCH_MASK
      }}>
      <div
        className="absolute inset-0 overflow-hidden rounded-lg"
        style={{
          maskImage: NOTCH_MASK,
          WebkitMaskImage: NOTCH_MASK
        }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)'
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={STROKE_MASK_STYLE}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 16px rgba(255,255,255,0.25)'
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: NOISE_SVG }}
        />
      </div>

      <div
        className="pointer-events-none absolute"
        style={{
          width: '50px',
          height: '50px',
          top: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          ...STROKE_MASK_STYLE
        }}
      />
    </div>
  )
}

export { AlbumCase }
