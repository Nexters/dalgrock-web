import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { setAccessToken, setAuthenticated } from '@/utils/auth'
import { toast } from 'sonner'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function KakaoCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('access_token')
    console.log('token', token)
    if (token) {
      setAccessToken(token)
      setAuthenticated()
      console.log('로그인 성공')
      navigate('/', { replace: true })
    } else {
      console.error('로그인 실패')
      navigate('/login', { replace: true })
      toast.error('로그인에 실패하였습니다.')
    }
  }, [navigate])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-600">
      <p className="text-gray-200">로그인 처리 중...</p>
    </div>
  )
}

export default KakaoCallback
