import { useState } from 'react'

import { Input } from './ui/input'
import { CloseCircleIcon, SearchIcon } from './icons'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  placeholder?: string
  className?: string
  width?: number
}

export function SearchBar({
  placeholder = '',
  className,
  width
}: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleClear = () => {
    setValue('')
  }

  return (
    <div
      className={cn(
        'rounded-lg bg-[#262930] p-[2px] focus-within:bg-[linear-gradient(142.18deg,rgba(255,255,255,0.2)_14.51%,rgba(255,255,255,0.08)_50.05%,rgba(255,255,255,0.2)_85.94%)]',
        width && `w-[${width}px]`
      )}>
      <div className="relative rounded-md bg-[#262930]">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />

        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          className={cn(
            'h-[48px] rounded-lg border-0 bg-transparent pl-9 pr-9 text-white focus-visible:ring-0',
            className
          )}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            <CloseCircleIcon
              height={20}
              width={20}
            />
          </button>
        )}
      </div>
    </div>
  )
}
