import React from 'react'

export function Attendance() {
  const demo = [
    { date: '2025-10-01', status: 'present' },
    { date: '2025-10-02', status: 'late' },
    { date: '2025-10-03', status: 'absent' },
  ]
  return (
    <table style={{ width: '100%', fontSize: 14 }}>
      <thead><tr><th style={{ textAlign: 'left', padding: 6 }}>Date</th><th style={{ textAlign: 'left', padding: 6 }}>Status</th></tr></thead>
      <tbody>
        {demo.map((r, i)=> (
          <tr key={i}><td style={{ padding: 6 }}>{r.date}</td><td style={{ padding: 6 }}>{r.status}</td></tr>
        ))}
      </tbody>
    </table>
  )
}


