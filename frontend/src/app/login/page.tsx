"use client"
import { useState } from 'react'
import { API_BASE } from '@/src/lib/api'

export default function LoginPage() {
  const [username, setUsername] = useState('alice')
  const [role, setRole] = useState<'student'|'parent'|'teacher'>('student')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, role }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Login failed')
      localStorage.setItem('jwt', data.token)
      window.location.href = '/'
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <select className="w-full border rounded px-3 py-2" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </main>
  )
}


