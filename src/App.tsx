import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'

function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[var(--max-viewport)] bg-gray-600">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
