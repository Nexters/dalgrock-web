interface MomentTag {
  tag: string
  albums: string[]
}

interface MomentAnalysisSectionProps {
  moments: MomentTag[]
}

function MomentAnalysisSection({ moments }: MomentAnalysisSectionProps) {
  return (
    <div className="px-5 py-[60px]">
      <h3 className="text-sm font-base text-[#C8CED8] mb-1">
        음악을 들은 순간 분석
      </h3>
      <p className="text-xl font-bold text-white mb-6">
        내 일상에 음악이 스며들었을 때
      </p>

      <div className="flex flex-col gap-3">
        {moments.map(({ tag, albums }) => (
          <div
            key={tag}
            className="w-fit inline-flex items-center gap-2 rounded-full px-1 py-2 backdrop-blur-[20px] bg-[#1C1D2399]"
            style={{
              boxShadow: 'inset 0px 0px 10px 0px #ffffff51',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
            <span className="pl-3 text-white text-xl font-bold">
              <span className="text-[#72EBD9] mr-0.5">#</span>
              {tag}
            </span>
            <div className="flex -space-x-2">
              {albums.slice(0, 3).map((albumUrl, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-gray-500 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                  {albumUrl ? (
                    <img
                      src={albumUrl}
                      alt="album"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white/30 text-[8px]">A</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { MomentAnalysisSection }
