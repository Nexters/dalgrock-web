import { useState, type ReactNode } from 'react'

import { ChevronDownIcon } from '@/components/icons'
import { cn } from '@/utils/cn'

interface FormSectionProps {
  label: string
  description?: string
  children: ReactNode
  required?: boolean
  defaultExpanded?: boolean
}

export function FormSection({
  label,
  description,
  children,
  required = false,
  defaultExpanded = false
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const isCollapsible = !required

  return (
    <div className="rounded-xl p-[1px]">
      <div className="py-4 flex flex-col gap-3 rounded-[11px] bg-[#1C1D2399] backdrop-blur-[20px] shadow-[inset_0px_0px_20px_0px_#FFFFFF0A] p-4">
        {isCollapsible ? (
          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex items-center justify-between w-full text-left">
            <h2 className="text-lg font-medium text-gray-0">{label}</h2>
            <ChevronDownIcon
              className={cn(
                'size-5 text-gray-400 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-gray-0">
              {label}
              <span className="text-[#72EBD9]">*</span>
            </h2>
            {description && (
              <p className="text-sm font-thin text-gray-200">{description}</p>
            )}
          </div>
        )}

        {(required || isExpanded) && <div>{children}</div>}
      </div>
    </div>
  )
}
