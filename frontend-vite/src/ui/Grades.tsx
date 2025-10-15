import React from 'react'

export function Grades() {
  const demo = [
    { subject: 'Math', term: 'midterm', score: 88, date: '2025-06-20' },
    { subject: 'Science', term: 'final', score: 92, date: '2025-07-01' },
  ]
  return (
    <table style={{ width: '100%', fontSize: 14 }}>
      <thead><tr><th style={{ textAlign: 'left', padding: 6 }}>Subject</th><th style={{ textAlign: 'left', padding: 6 }}>Term</th><th style={{ textAlign: 'left', padding: 6 }}>Score</th><th style={{ textAlign: 'left', padding: 6 }}>Date</th></tr></thead>
      <tbody>
        {demo.map((g, i)=> (
          <tr key={i}><td style={{ padding: 6 }}>{g.subject}</td><td style={{ padding: 6 }}>{g.term}</td><td style={{ padding: 6 }}>{g.score}</td><td style={{ padding: 6 }}>{g.date}</td></tr>
        ))}
      </tbody>
    </table>
  )
}


