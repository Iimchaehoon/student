import React from 'react'
import { RecommendationCard } from './RecommendationCard'
import { MiniTrends } from './Charts'

export function Dashboard() {
  const role = (typeof window !== 'undefined' && (localStorage.getItem('role') as any)) || 'student'
  const isParent = role === 'parent'
  const isTeacher = role === 'teacher'

  return (
    <div>
      <section className="hero">
        <div className="space">
          <div className="stars" />
          <div className="planet" />
          <div className="ring" />
          <div className="rocket" />
          <div className="shooting s1" />
          <div className="shooting s2" />
          <div className="shooting s3" />
          <div className="milky" />
          <div className="moon" />
        </div>
        <div className="container hero-grid">
          <div>
            <span className="spark">이번 주 학습 추천</span>
            <h1>오늘의 AI 제안</h1>
            <p>{isParent ? '학생의 이번 주 학습 요약이에요. 자세한 내용은 요약 수준으로만 제공돼요.' : '이번 주 잘하고 있어요! 수학은 문제풀이 시간을 조금 더 가져볼까요?'}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a className="cta" href="/student/grades">성적 보기</a>
              <a className="cta secondary" href="/student/attendance">출석 확인</a>
            </div>
          </div>
          <div className="hero-card">
            <h3>학습 루틴</h3>
            <p className="muted">오후 4시에 30분 독서, 20분 수학 문제풀이를 추천해요.</p>
            <div className="mascot">🧚</div>
          </div>
        </div>
      </section>

      <div className="container sections">
        <div className="card slideUp">
          <h3>이번 주 목표</h3>
          <span className="pill blue">집중</span>
          <span className="pill yellow">규칙</span>
          <p className="muted">하루 40분 이상 학습하기, 월요일은 일찍 자기</p>
        </div>
        <div className="card slideUp">
          <h3>AI 추천 활동</h3>
          <span className="pill pink">과학</span>
          <p className="muted">과학 동아리 실험 일지 작성해보기</p>
        </div>
        <div className="card slideUp">
          <h3>알림</h3>
          <p className="muted">금요일 창의 체험 수업이 있어요. 준비물을 확인하세요.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <RecommendationCard category="학습" title="학습" message="최근 수학 성적이 상승 추세입니다. 지금처럼 문제풀이 중심 복습을 유지하세요." />
        <RecommendationCard category="루틴" title="루틴" message="밤 11시 이후 공부시간이 집중도가 낮아요. 다음 주는 오후 루틴 중심으로 조정해보세요." />
        {!isParent && (
          <>
            <RecommendationCard category="생활" title="생활" message="지각이 잦은 요일은 월요일이에요. 전날 취침시간을 30분 앞당겨보세요." />
            <RecommendationCard category="활동" title="활동" message="과학 동아리 활동 비중이 높습니다. ‘창의융합 캠프’ 참가를 추천합니다." />
          </>
        )}
        {isTeacher && (
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <h3>교사용 반별 요약</h3>
            <p className="muted">AI가 제시한 지도 포인트: 월요일 첫 교시에 루틴 점검, 수학 문제풀이 시간 확보</p>
          </div>
        )}
        <MiniTrends />
      </div>
    </div>
  )
}


