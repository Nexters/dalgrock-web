import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { setAccessToken, setAuthenticated } from '@/utils/auth'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function KakaoCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('access_token')
    if (token) {
      setAccessToken(token)
    }
    setAuthenticated()
    navigate('/', { replace: true })
  }, [navigate])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-600">
      <p className="text-gray-200">로그인 처리 중...</p>
    </div>
  )
}

export default KakaoCallback
