import type { IconProps } from '.'

interface ArrowIconProps extends IconProps {
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function ArrowIcon({
  direction = 'left',
  height = 48,
  width = 48,
  ...props
}: ArrowIconProps) {
  const path =
    direction === 'left'
      ? 'M27.1228 14.8789L18 24.0017L27.1228 33.1245'
      : direction === 'right'
        ? 'M18 24.0017L27.1228 14.8789L36.2456 24.0017'
        : direction === 'up'
          ? 'M27.1228 33.1245L18 24.0017L27.1228 14.8789'
          : 'M18 24.0017L27.1228 33.1245L36.2456 24.0017'
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d={path}
        stroke="#9EA4B2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
