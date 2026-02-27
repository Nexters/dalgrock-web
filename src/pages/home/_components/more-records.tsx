import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function MoreRecords() {
  return (
    <div className="flex-col mx-auto mt-6 w-full max-w-[80%] gap-1">
      <div className="h-0.25 w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="flex items-center justify-center gap-1">
        <Link
          className="py-2 text-sm tracking-[-0.4px] text-gray-300"
          to="/records">
          기록 전체보기
        </Link>
        <ChevronRight className="size-4 text-gray-300" />
      </div>
    </div>
  )
}

export { MoreRecords }
