export function Tag({ label }: { label: string }) {
  return (
    <div className="rounded-full px-[14px] py-2 text-sm font-bold bg-gray-100">
      <p className="text-gray-600">{label}</p>
    </div>
  )
}
