import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home-page'
import NotFoundPage from './pages/not-found-page'

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
