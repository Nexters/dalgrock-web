import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { setAuthenticated } from '@/utils/auth'

function KakaoCallback() {
  const navigate = useNavigate()

  useEffect(() => {
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
