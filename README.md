# Student Information & AI Learning Coach Platform

Monorepo scaffold implementing the PRD: Next.js + Tailwind (frontend), Express + TypeScript (backend), Flask (AI service), MySQL (core), MongoDB (AI logs/recs), all orchestrated with Docker Compose.

## Services
- Frontend: Next.js 14 (port 3000)
- Backend: Express + TS (port 4000)
- AI: Flask + Gunicorn (port 5000)
- MySQL: 8.0 (port 3306)
- MongoDB: 6 (port 27017)

## Quickstart
1) Prereqs: Docker Desktop 4+, Node 18+ (if running locally), Python 3.11+ (optional).

2) Environment variables:
   - Copy `backend/.env.example` to `backend/.env` and adjust secrets.
   - Frontend and AI examples are present but may be blocked from editing by policy; configure via Docker env or create `.env` locally as needed.

3) Build & run with Docker:
```bash
cd infra
docker compose up --build
```
Then open:
- Frontend: http://localhost:3000
- Backend health: http://localhost:4000/health
- AI health: http://localhost:5000/health

## Development (without Docker)
Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

AI service:
```bash
cd ai
pip install -r requirements.txt
python -m app.main
```

## Auth (temporary demo)
POST `/auth/login` with JSON body `{ "username": "alice", "role": "student|parent|teacher" }` returns a JWT (30m). Use `Authorization: Bearer <token>` to access `/ai/summary`.

## Next steps (per PRD)
- Implement real user store (MySQL) and password hashing (bcrypt).
- Role-based resource access (student/parent/teacher scoping).
- Attendance, grades, schedules, clubs, counseling endpoints and schemas.
- AI `/recommendations` integration from backend with anonymization.
- Charts for grades/attendance; dashboards per role; notifications.
- Security hardening (OWASP), session idle logout, HTTPS in production.

