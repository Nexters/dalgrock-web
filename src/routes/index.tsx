import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'

import { authRoutes } from './auth'
import { recordRoutes } from './records'
import { reportRoutes } from './reports'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  ...authRoutes,
  ...recordRoutes,
  ...reportRoutes,
  { path: '*', element: <NotFound /> }
])
