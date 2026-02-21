import { createBrowserRouter } from 'react-router-dom'

import { AuthGuard } from '@/components/auth-guard'
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { Settings } from '@/pages/settings'

import { authRoutes } from './auth'
import { recordRoutes } from './records'
import { reportRoutes } from './reports'

export const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <AuthGuard />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/settings', element: <Settings /> },
      ...recordRoutes,
      ...reportRoutes
    ]
  },
  { path: '*', element: <NotFound /> }
])
