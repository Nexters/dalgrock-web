import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { API_BASE_URL } from '@/apis/instance'
import { KakaoIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

import MainSplash1 from '@/assets/main-splash/main-splash-1.webp'
import MainSplash2 from '@/assets/main-splash/main-splash-2.webp'

const SLIDES = [
  {
    image: MainSplash1,
    alt: 'main-splash-1',
    title: '음악으로 나만의\n하루를 기록해보세요'
  },
  {
    image: MainSplash2,
    alt: 'main-splash-2',
    title: '매일의 감정을\n음악으로 담아보세요'
  }
]

function Login() {
  const { isAuthenticated } = useAuth()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-600">
      <div className="flex-1 flex flex-col gap-8 pb-24 overflow-hidden">
        <div
          className="w-full overflow-hidden"
          ref={emblaRef}>
          <div className="flex touch-pan-y">
            {SLIDES.map((slide, index) => (
              <div
                key={index}
                className="flex-[0_0_100%]">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <h1 className="shrink-0 mx-5 text-[28px] font-bold text-white whitespace-pre-line">
          {SLIDES[selectedIndex].title}
        </h1>

        <div className="shrink-0 flex justify-center gap-1.5">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === selectedIndex
                  ? 'w-4 h-1 bg-gray-100'
                  : 'w-1 h-1 bg-gray-400'
              )}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[536px] mx-auto bg-gradient-to-t from-gray-600 to-transparent px-5 pb-8 pt-12">
        <Button
          onClick={handleKakaoLogin}
          className="h-[52px] w-full rounded-xl bg-[#FEE500] text-base font-medium tracking-tight text-[#0F0F11] hover:bg-[#FEE500]/90 active:opacity-90">
          <KakaoIcon />
          카카오로 시작하기
        </Button>
      </div>
    </div>
  )
}

export { Login }
