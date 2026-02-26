import type { IconProps } from '.'

export function CircleCheckIcon({
  height = 20,
  width = 20,
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="10"
        cy="10"
        r="10"
        fill="#2AC47E"
      />
      <path
        d="M5.5 10L8.5 13L14.5 7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
