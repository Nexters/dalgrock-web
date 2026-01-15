import HomePage from '@/pages/home'
import NotFoundPage from '@/pages/not-found'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}

export default App
