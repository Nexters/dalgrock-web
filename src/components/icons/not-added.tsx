import type { IconProps } from '.'

export function NotAddedIcon({ height = 24, width = 24, ...props }: IconProps) {
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
        r="10.2"
        stroke="#494E5A"
        strokeWidth="1.6"
      />
      <path
        d="M7.75781 12H16.2425"
        stroke="#494E5A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 16.2422L11.9999 7.75761"
        stroke="#494E5A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
