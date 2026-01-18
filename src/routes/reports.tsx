import type { RouteObject } from 'react-router-dom'

import { Reports } from '@/pages/reports'
import { ReportDetail } from '@/pages/reports/[id]'

export const reportRoutes: RouteObject[] = [
  { path: 'reports', element: <Reports /> },
  { path: 'reports/:id', element: <ReportDetail /> }
]
