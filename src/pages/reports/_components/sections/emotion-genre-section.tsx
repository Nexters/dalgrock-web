import { useMemo } from 'react'
import { gradientCss, GRADIENTS, pickUnique } from '../gradient'
import { AlbumGrid } from '../album-grid'

interface EmotionGenreSectionProps {
  data: {
    emotion: string
    genres: string[]
    albums: string[]
    description: string
  }[]
}

function EmotionGenreSection({ data }: EmotionGenreSectionProps) {
  const cardGradients = useMemo(() => {
    return data.map(() => pickUnique(GRADIENTS, 3))
  }, [data])

  return (
    <div className="mx-5">
      <h3 className="text-sm font-base text-[#C8CED8] mb-1">
        감정과 음악 장르 분석
      </h3>
      <p className="text-xl font-bold text-white mb-6">
        내 감정은 이런 음악을 따라가요
      </p>

      <div className="flex flex-col gap-6">
        {data.map(({ emotion, genres, albums, description }, index) => {
          const selected = cardGradients[index]
          const layers = selected.map(gradientCss).join(', ')
          const bg = {
            backgroundImage: layers,
            opacity: 1
          } as React.CSSProperties

          return (
            <div
              key={`${emotion}-${index}`}
              className="rounded-2xl backdrop-blur-[20px] relative overflow-hidden"
              style={{
                boxShadow: 'inset 0px 0px 20px 0px #FFFFFF0A',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
              <div
                aria-hidden
                className="absolute inset-0"
                style={bg}
              />
              <div className="relative">
                <div className="px-5 pt-6 flex justify-between">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold text-[#16171C]">
                      {emotion}
                    </div>
                    <div className="flex flex-col gap-1 mt-4 mb-5">
                      {genres.map(genre => (
                        <span
                          key={genre}
                          className="rounded-4xl w-fit py-1 px-2.5 bg-black text-[14px] font-medium text-white">
                          #{genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mb-5">
                    <AlbumGrid albums={albums} />
                  </div>
                </div>

                <p
                  className="p-5 text-sm text-[#16171C] leading-relaxed"
                  style={{
                    background:
                      'radial-gradient(circle at 50% -10%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%)'
                  }}>
                  {description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { EmotionGenreSection }
