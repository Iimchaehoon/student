import React from 'react'

export function Attendance() {
  const demo = [
    { date: '2025-10-01', status: 'present' },
    { date: '2025-10-02', status: 'late' },
    { date: '2025-10-03', status: 'absent' },
  ]
  const [status, setStatus] = React.useState<'all'|'present'|'late'|'absent'>('all')
  const filtered = status === 'all' ? demo : demo.filter(d => d.status === status)
  return (
    <div>
      <div className="subheader container">
        <div className="breadcrumb"><a href="/student/">홈</a> · 출석</div>
        <div className="tabs">
          {['all','present','late','absent'].map(t => (
            <button key={t} className={"tab" + (status===t as any ? ' active' : '')} onClick={()=>setStatus(t as any)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="card">
      <h3 style={{ marginTop: 0 }}>출석</h3>
      <table className="table">
        <thead><tr><th>Date</th><th>Status</th></tr></thead>
        <tbody>
          {filtered.map((r, i)=> (
            <tr key={i}><td>{r.date}</td><td>{r.status}</td></tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}


