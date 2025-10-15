import React from 'react'

export function Grades() {
  const demo = [
    { subject: '수학', term: '중간', score: 88, date: '2025-06-20' },
    { subject: '과학', term: '기말', score: 92, date: '2025-07-01' },
  ]
  const [term, setTerm] = React.useState<'전체'|'중간'|'기말'|'모의'>('전체')
  const [form, setForm] = React.useState({ subject: '', term: '중간', score: '' })
  const filtered = term === '전체' ? demo : demo.filter(g => g.term === term)
  return (
    <div>
      <div className="subheader container">
        <div className="breadcrumb"><a href="/student/">홈</a> · 성적</div>
        <div className="tabs">
          {['전체','중간','기말','모의'].map(t => (
            <button key={t} className={"tab" + (term===t ? ' active' : '')} onClick={()=>setTerm(t as any)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="card">
      <h3 style={{ marginTop: 0 }}>성적</h3>
      <table className="table">
        <thead><tr><th>과목</th><th>구분</th><th>점수</th><th>일자</th></tr></thead>
        <tbody>
          {filtered.map((g, i)=> (
            <tr key={i}><td>{g.subject}</td><td>{g.term}</td><td>{g.score}</td><td>{g.date}</td></tr>
          ))}
        </tbody>
      </table>
      </div>
      <form className="card-form" onSubmit={(e)=>{e.preventDefault(); alert('데모: 성적 입력이 저장되었습니다.');}}>
        <h3 style={{ marginTop: 0 }}>성적 입력(데모)</h3>
        <div className="row" style={{ marginBottom: 10 }}>
          <input className="input" placeholder="과목" value={form.subject} onChange={e=>setForm(f=>({ ...f, subject: e.target.value }))} />
          <select className="input" value={form.term} onChange={e=>setForm(f=>({ ...f, term: e.target.value }))}>
            <option>중간</option>
            <option>기말</option>
            <option>모의</option>
          </select>
        </div>
        <div className="row" style={{ marginBottom: 10 }}>
          <input className="input" placeholder="점수" value={form.score} onChange={e=>setForm(f=>({ ...f, score: e.target.value }))} />
          <div />
        </div>
        <button className="btn primary" type="submit">저장</button>
      </form>
    </div>
  )
}


