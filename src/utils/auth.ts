const AUTH_KEY = 'is_authenticated'
const TOKEN_KEY = 'access_token'

export function getIsAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function setAuthenticated(): void {
  localStorage.setItem(AUTH_KEY, 'true')
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(TOKEN_KEY)
}
