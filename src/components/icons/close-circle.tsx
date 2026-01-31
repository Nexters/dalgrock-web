import type { IconProps } from '.'

interface CloseCircleIconProps extends IconProps {
  height?: number
  width?: number
}
export function CloseCircleIcon({
  height = 20,
  width = 20,
  ...props
}: CloseCircleIconProps) {
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
        fill="#6B7181"
      />
      <path
        d="M6.87512 6.875L13.1244 13.1242"
        stroke="#16171C"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M6.87531 13.125L13.1245 6.87585"
        stroke="#16171C"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
    </svg>
  )
}
