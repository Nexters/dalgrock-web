import type { IconProps } from '.'

interface SearchIconProps extends IconProps {
  height?: number
  width?: number
}
export function SearchIcon({
  height = 24,
  width = 24,
  ...props
}: SearchIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M20.1633 21.1358C20.5148 21.4873 21.0847 21.4873 21.4361 21.1358C21.7876 20.7844 21.7876 20.2145 21.4361 19.863L20.7997 20.4994L20.1633 21.1358ZM16.3394 16.0391L15.703 16.6755L20.1633 21.1358L20.7997 20.4994L21.4361 19.863L16.9758 15.4027L16.3394 16.0391Z"
        fill="#6B7181"
      />
      <circle
        cx="11.2104"
        cy="10.9106"
        r="7.51057"
        stroke="#6B7181"
        strokeWidth="1.8"
      />
    </svg>
  )
}
