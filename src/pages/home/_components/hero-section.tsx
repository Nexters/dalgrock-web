interface HeroSectionProps {
  hasRecord?: boolean
}

function HeroSection({ hasRecord = false }: HeroSectionProps) {
  return (
    <div className="pt-3 px-5">
      <h1 className="text-2xl font-bold leading-[1.4] tracking-[-0.4px] text-white">
        {hasRecord ? (
          <>
            오늘 기록을 완료했어요!
            <br />
            일요일에 분석해드려요
          </>
        ) : (
          <>
            음악으로 오늘을 기록해보세요!
            <br />
            일요일에 분석해드려요
          </>
        )}
      </h1>
    </div>
  )
}

export { HeroSection }
