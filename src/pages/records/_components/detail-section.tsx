import { type ReactNode } from 'react'

interface DetailSectionProps {
  label: string
  children: ReactNode
  onEdit: () => void
}

export function DetailSection({ label, children, onEdit }: DetailSectionProps) {
  return (
    <div className="rounded-xl p-[1px]">
      <div className="py-6 px-5 flex flex-col gap-5 rounded-[11px] bg-[#1C1D2399] backdrop-blur-[20px] shadow-[inset_0px_0px_20px_0px_#FFFFFF0A] p-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-md font-bold text-gray-0">{label}</h2>

          <button
            className="text-gray-100 text-sm"
            onClick={onEdit}>
            편집
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}
