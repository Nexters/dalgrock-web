import type { IconProps } from '.'

export function AddedIcon({ height = 24, width = 24, ...props }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="white"
      />
      <path
        d="M7.5 12H16.5"
        stroke="#16171C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 16.5L11.9999 7.5"
        stroke="#16171C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
