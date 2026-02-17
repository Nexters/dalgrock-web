import { createBrowserRouter } from 'react-router-dom'

import { AuthGuard } from '@/components/auth-guard'
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'

import { authRoutes } from './auth'
import { recordRoutes } from './records'
import { reportRoutes } from './reports'

export const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <AuthGuard />,
    children: [
      { path: '/', element: <Home /> },
      ...recordRoutes,
      ...reportRoutes
    ]
  },
  { path: '*', element: <NotFound /> }
])
