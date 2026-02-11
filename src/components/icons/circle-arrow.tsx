import type { IconProps } from '.'

interface CircleArrowIconProps extends IconProps {
  direction?: 'left' | 'right'
}

export function CircleArrowIcon({
  direction = 'left',
  height = 20,
  width = 20,
  ...props
}: CircleArrowIconProps) {
  const path =
    direction === 'left'
      ? 'M11.3332 5.83203L7.1665 9.9987L11.3332 14.1654'
      : 'M8.74984 5.83203L12.9165 9.9987L8.74984 14.1654'
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="10.0002"
        cy="9.9987"
        r="9.16667"
        fill="#262930"
      />
      <path
        d={path}
        stroke="#9EA4B2"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
