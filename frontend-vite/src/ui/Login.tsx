import React, { useState } from 'react'

export function Login() {
  const [username, setUsername] = useState('alice')
  const [role, setRole] = useState<'student'|'parent'|'teacher'>('student')

  return (
    <form style={{ display: 'grid', gap: 8, maxWidth: 320 }} onSubmit={(e)=>{e.preventDefault(); alert(`Logged in as ${username} (${role}) — demo only`)}}>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
      <select value={role} onChange={e=>setRole(e.target.value as any)}>
        <option value="student">Student</option>
        <option value="parent">Parent</option>
        <option value="teacher">Teacher</option>
      </select>
      <button>Login</button>
    </form>
  )
}


