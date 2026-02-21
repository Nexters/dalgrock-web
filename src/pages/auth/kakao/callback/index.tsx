import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { setAccessToken, setAuthenticated } from '@/utils/auth'

function KakaoCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setAccessToken(token)
    }
    setAuthenticated()
    navigate('/', { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-600">
      <p className="text-gray-200">로그인 처리 중...</p>
    </div>
  )
}

export default KakaoCallback
