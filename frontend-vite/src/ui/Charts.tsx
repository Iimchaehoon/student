import React from 'react'

export function TrendBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div style={{ height: 8, background: '#eceff1', borderRadius: 8 }}>
        <div style={{ width: `${value}%`, height: 8, background: color, borderRadius: 8, transition: 'width .6s ease' }} />
      </div>
    </div>
  )
}

export function MiniTrends() {
  return (
    <div className="card">
      <h3>학습/생활 트렌드</h3>
      <div className="bars">
        <div>
          <div className="bar-label"><span>수학 향상</span><span>82%</span></div>
          <div className="bar"><span style={{ width: '82%' }} /></div>
        </div>
        <div>
          <div className="bar-label"><span>월요일 지각 감소</span><span>40%</span></div>
          <div className="bar"><span style={{ width: '40%', background: 'linear-gradient(90deg, var(--pink), #ffb3c7)' }} /></div>
        </div>
        <div>
          <div className="bar-label"><span>루틴 준수</span><span>70%</span></div>
          <div className="bar"><span style={{ width: '70%', background: 'linear-gradient(90deg, var(--brand-2), #6ef3c5)' }} /></div>
        </div>
      </div>
    </div>
  )
}


