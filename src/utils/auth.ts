const AUTH_KEY = 'is_authenticated'

export function getIsAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function setAuthenticated(): void {
  localStorage.setItem(AUTH_KEY, 'true')
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY)
}
