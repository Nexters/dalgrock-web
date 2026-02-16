import type { ReactNode } from 'react'

interface WeeklySectionLayoutProps {
  children: ReactNode
}
export function WeeklySectionLayout({ children }: WeeklySectionLayoutProps) {
  return (
    <div
      className="py-6 backdrop-blur-[20px]"
      style={{
        background: '#1C1D2399',
        boxShadow: 'inset 0px 0px 20px 0px #FFFFFF0A',
        border: '1px solid',
        borderRadius: '16px',
        borderImageSource:
          'linear-gradient(142.18deg, rgba(255, 255, 255, 0.036) 14.51%, rgba(255, 255, 255, 0.012) 50.05%, rgba(255, 255, 255, 0.036) 85.94%)',
        borderImageSlice: 1
      }}>
      {children}
    </div>
  )
}
