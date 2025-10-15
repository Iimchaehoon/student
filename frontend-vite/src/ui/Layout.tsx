import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  const [dark, setDark] = React.useState<boolean>(false)
  const [role, setRole] = React.useState<'student'|'parent'|'teacher'>(() => (localStorage.getItem('role') as any) || 'student')

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.classList.remove('role-student','role-parent','role-teacher')
    root.classList.add(role === 'student' ? 'role-student' : role === 'parent' ? 'role-parent' : 'role-teacher')
  }, [dark])

  React.useEffect(() => {
    localStorage.setItem('role', role)
    const root = document.documentElement
    root.classList.remove('role-student','role-parent','role-teacher')
    root.classList.add(role === 'student' ? 'role-student' : role === 'parent' ? 'role-parent' : 'role-teacher')
  }, [role])

  return (
    <div>
      <div className="navbar">
        <div className="container navinner">
          <Link to="/" className="brand" style={{ textDecoration: 'none' }}><span className="brand-badge">AI</span> 학생 AI 웹</Link>
          <nav className="navlinks">
            <Link to="/">대시보드</Link>
            <Link to="/login">로그인</Link>
            <Link to="/attendance">출석</Link>
            <Link to="/grades">성적</Link>
          </nav>
          <div className="toolbar">
            <select className="select" value={role} onChange={e=>setRole(e.target.value as any)}>
              <option value="student">학생</option>
              <option value="parent">학부모</option>
              <option value="teacher">교사</option>
            </select>
            <div className={"toggle" + (dark ? ' active' : '')} onClick={()=>setDark(v=>!v)} title="다크 모드" />
          </div>
        </div>
      </div>
      <Outlet />
      <footer className="footer">
        <div className="container">
          <small>© {new Date().getFullYear()} 학생 AI 웹 · 즐거운 학습 여정을 응원해요!</small>
        </div>
      </footer>
    </div>
  )
}


