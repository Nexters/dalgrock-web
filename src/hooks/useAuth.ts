import { useCallback, useSyncExternalStore } from 'react'

import { clearAuth, getIsAuthenticated } from '@/utils/auth'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot() {
  return getIsAuthenticated()
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot)

  const logout = useCallback(() => {
    clearAuth()
    window.location.href = '/login'
  }, [])

  return { isAuthenticated, logout }
}
