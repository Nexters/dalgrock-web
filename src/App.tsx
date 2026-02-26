import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { CircleCheckIcon } from '@/components/icons'
import { router } from './routes'

function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[var(--max-viewport)] bg-gray-600">
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        style={{ bottom: '100px' }}
        toastOptions={{
          style: {
            width: 'fit-content',
            left: 0,
            right: 0,
            margin: '0 auto',
            background: '#383B45',
            color: '#FFFFFF',
            borderRadius: '30px',
            border: 'none',
            padding: '14px 20px',
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
