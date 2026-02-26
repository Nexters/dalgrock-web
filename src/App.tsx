import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { CircleCheckIcon } from '@/components/icons'
import { router } from './routes'

function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[var(--max-viewport)] bg-gray-600">
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#383B45',
            color: '#FFFFFF',
            borderRadius: '30px',
            border: 'none',
            padding: '14px 20px',
            width: 'fit-content',
            margin: '0 auto',
            fontSize: '15px',
            fontWeight: '500',
            gap: '10px'
          }
        }}
        icons={{
          success: <CircleCheckIcon className="shrink-0" />
        }}
      />
    </div>
  )
}

export default App
