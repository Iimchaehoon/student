import React, { useState } from 'react'

export function Login() {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState<'student'|'parent'|'teacher'>('student')
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('role', role)
    alert(`${username || '익명'}님, ${role === 'student' ? '학생' : role === 'parent' ? '학부모' : '교사'} 권한으로 로그인(데모)되었습니다.`)
    window.location.href = '/student/'
  }

  return (
    <form className="card-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>로그인</h2>
      <div className="row" style={{ marginBottom: 10 }}>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="이름 또는 아이디" />
        <select className="input" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="student">학생</option>
          <option value="parent">학부모</option>
          <option value="teacher">교사</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn primary" type="submit">로그인</button>
        <a className="btn ghost" href="/student/">취소</a>
      </div>
    </form>
  )
}


