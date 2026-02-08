import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[var(--max-viewport)] bg-gray-600">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
