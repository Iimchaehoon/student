import React from 'react'

type Props = { title: string; message: string; category: '학습'|'루틴'|'생활'|'활동' }

function makeICS(summary: string, description: string, startDate: Date) {
  const end = new Date(startDate.getTime() + 30 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//student-ai-web//KR',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(startDate)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'routine.ics'; a.click();
  setTimeout(()=> URL.revokeObjectURL(url), 0)
}

function Icon({ category }: { category: Props['category'] }) {
  if (category === '학습') return <span role="img" aria-label="asteroid">☄️</span>
  if (category === '루틴') return <span role="img" aria-label="satellite">🛰️</span>
  if (category === '생활') return <span role="img" aria-label="moon">🌙</span>
  return <span role="img" aria-label="planet">🪐</span>
}

export function RecommendationCard({ title, message, category }: Props) {
  const [state, setState] = React.useState<'idle'|'like'|'dislike'>('idle')
  const onLike = () => setState('like')
  const onDislike = () => setState('dislike')
  const onApply = () => makeICS(`${category}: ${title}`, message, new Date())

  return (
    <div className="card fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon category={category} /> {title}</h3>
        <span className="pill blue">{category}</span>
      </div>
      <p className="muted" style={{ marginTop: 6 }}>{message}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button className="cta" onClick={onLike}>좋아요</button>
        <button className="cta secondary" onClick={onDislike}>도움 안돼요</button>
        {category === '루틴' && <button className="cta" onClick={onApply}>바로 적용하기</button>}
      </div>
      {state !== 'idle' && (
        <p className="muted" style={{ marginTop: 8 }}>{state === 'like' ? '피드백 감사합니다! 추천을 강화할게요.' : '의견 감사합니다! 다음 추천에 반영할게요.'}</p>
      )}
    </div>
  )
}


