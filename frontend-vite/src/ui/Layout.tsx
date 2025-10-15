import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Student AI Web</h1>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/grades">Grades</Link>
      </nav>
      <Outlet />
    </div>
  )
}


