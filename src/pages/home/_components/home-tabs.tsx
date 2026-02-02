import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

function HomeTabs() {
  const location = useLocation()
  const isRecords = location.pathname === '/' || location.pathname === '/home'
  const isReports = location.pathname === '/reports'

  return (
    <div className="flex h-[60px] items-end justify-between px-[14px]">
      <div className="flex gap-5">
        <Link
          to="/"
          className={cn(
            'relative pb-1 text-xl font-bold tracking-tight',
            isRecords ? 'text-white' : 'text-white/50'
          )}>
          내 기록
          {isRecords && (
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-white" />
          )}
        </Link>
        <Link
          to="/reports"
          className={cn(
            'relative pb-1 text-xl font-bold tracking-tight',
            isReports ? 'text-white' : 'text-white/50'
          )}>
          리포트
          {isReports && (
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-white" />
          )}
        </Link>
      </div>
      <Button
        variant="ghost"
        className="h-auto p-2 text-sm font-medium tracking-tight text-[#878787] hover:bg-transparent hover:text-gray-50">
        설정
      </Button>
    </div>
  )
}

export { HomeTabs }
