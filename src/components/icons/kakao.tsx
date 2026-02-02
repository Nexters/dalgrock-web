import type { IconProps } from '.'

interface KakaoIconProps extends IconProps {
  size?: number
}

export function KakaoIcon({ size = 18, ...props }: KakaoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.9C4.02975 0.9 0 4.01325 0 7.86825C0 10.3133 1.5585 12.468 3.93075 13.7205L2.9295 17.3123C2.84625 17.6115 3.18825 17.8478 3.44925 17.6715L7.7985 14.7788C8.19225 14.8193 8.5935 14.8365 9 14.8365C13.9703 14.8365 18 11.7232 18 7.86825C18 4.01325 13.9703 0.9 9 0.9Z"
        fill="#0F0F11"
      />
    </svg>
  )
}
