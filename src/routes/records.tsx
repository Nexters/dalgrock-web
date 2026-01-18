import type { RouteObject } from 'react-router-dom'

import { Records } from '@/pages/records'
import { RecordNew } from '@/pages/records/new'
import { RecordDetail } from '@/pages/records/[id]'

export const recordRoutes: RouteObject[] = [
  { path: 'records', element: <Records /> },
  { path: 'records/new', element: <RecordNew /> },
  { path: 'records/:id', element: <RecordDetail /> }
]
