import { API_BASE_URL } from '@/apis/instance'
import { KakaoIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gray-600">
      <div className="flex flex-1 flex-col items-center justify-center px-5">
        <div className="flex h-[200px] w-[200px] items-center justify-center rounded-lg bg-gray-200/20">
          <span className="text-xl font-medium tracking-tight text-gray-600">
            graphic
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-t from-gray-600 to-transparent px-5 pb-8 pt-12">
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
