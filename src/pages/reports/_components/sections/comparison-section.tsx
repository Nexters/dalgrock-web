import { getJosa } from '@/utils/korean'

interface ComparisonSectionProps {
  emotion: string
  genre: string
  nextWeekSuggestion: string
}

function ComparisonSection({
  emotion,
  genre,
  nextWeekSuggestion
}: ComparisonSectionProps) {
  return (
    <div
      className="px-5 pt-8 pb-12 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% -10%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%)'
      }}>
      <h3 className="text-sm font-base text-[#C8CED8] mb-1">
        지난 주와의 비교 분석
      </h3>

      <p className="text-xl font-bold text-white mb-6 leading-[1.6]">
        지난 주에 비해 <span className="text-[#72EBD9]">{emotion}</span>
        {getJosa(emotion, '을', '를')} 더 많이 느끼고{' '}
        <span className="text-[#72EBD9]">{genre}</span> 장르 음악을 많이 들은 한
        주였어요
      </p>

      <p className="font-normal text-base text-white leading-[1.6]">
        {nextWeekSuggestion}
      </p>
    </div>
  )
}

export { ComparisonSection }
