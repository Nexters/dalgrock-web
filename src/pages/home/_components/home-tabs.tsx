import { Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils/cn'
import { Header } from '@/components/header'

function HomeTabs() {
  const { pathname } = useLocation()
  const isRecords = pathname === '/' || pathname === '/home'
  const isReports = pathname.startsWith('/reports')

  return (
    <div className="h-[60px] pt-2 items-center justify-between px-5">
      <Header
        showBackButton={false}
        leftChild={
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
        }
        rightChild={
          <Link to="/settings">
            <Settings className="h-6 w-6 text-gray-200" />
          </Link>
        }
      />
    </div>
  )
}

export { HomeTabs }
