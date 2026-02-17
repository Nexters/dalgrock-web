import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { Login } from '@/pages/login'

const KakaoCallback = lazy(() => import('@/pages/auth/kakao/callback'))

export const authRoutes: RouteObject[] = [
  { path: 'login', element: <Login /> },
  { path: 'auth/kakao/callback', element: <KakaoCallback /> }
]
