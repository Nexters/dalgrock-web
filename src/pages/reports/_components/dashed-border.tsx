import { cn } from '@/utils/cn'

interface DashedBorderProps {
  className?: string
  radius?: number
  dash?: string
  stroke?: string
  strokeWidth?: number
  inset?: number
}

export function DashedBorder({
  className,
  radius = 16,
  dash = '20 14',
  stroke = '#494E5A',
  strokeWidth = 1.5,
  inset = 0.75
}: DashedBorderProps) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 z-[1]', className)}
      width="100%"
      height="100%"
      aria-hidden="true">
      <rect
        x={inset}
        y={inset}
        width={`calc(100% - ${inset * 2}px)`}
        height={`calc(100% - ${inset * 2}px)`}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeLinecap="round"
      />
    </svg>
  )
}
