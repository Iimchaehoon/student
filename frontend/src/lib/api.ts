export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('jwt')
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as any) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, cache: 'no-store' })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}


