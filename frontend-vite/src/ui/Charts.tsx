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
      <TrendBar label="수학 향상" value={82} color="var(--blue)" />
      <TrendBar label="월요일 지각 감소" value={40} color="var(--pink)" />
      <TrendBar label="루틴 준수" value={70} color="var(--brand-2)" />
    </div>
  )
}


