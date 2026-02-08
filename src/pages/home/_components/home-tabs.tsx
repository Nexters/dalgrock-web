import { Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils/cn'

function HomeTabs() {
  const location = useLocation()
  const isRecords = location.pathname === '/' || location.pathname === '/home'
  const isReports = location.pathname === '/reports'

  return (
    <div className="flex h-[60px] items-center justify-between px-5">
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
      <Link
        to="/settings"
        className="p-2">
        <Settings className="h-6 w-6 text-[#6B7181]" />
      </Link>
    </div>
  )
}

export { HomeTabs }
