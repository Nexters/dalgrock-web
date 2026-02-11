function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-5">
      <div className="text-center">
        <p className="text-lg font-bold text-white mb-2">리포트가 없어요</p>
        <p className="text-sm text-gray-300">
          기록을 남기면 주간 리포트를 받을 수 있어요
        </p>
      </div>
    </div>
  )
}

export { EmptyState }
