import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import axios from 'axios';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// DB connections
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'student',
  password: process.env.MYSQL_PASSWORD || 'studentpass',
  database: process.env.MYSQL_DATABASE || 'studentdb',
  waitForConnections: true,
  connectionLimit: 10
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/student_ai';
mongoose.connect(mongoUri).catch((err) => console.error('Mongo connect error', err));

type Role = 'student' | 'parent' | 'teacher' | 'admin';

interface JwtPayload {
  sub: string;
  role: Role;
}

const authMiddleware = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as JwtPayload;
      (req as any).user = payload;
      if (roles && !roles.includes(payload.role)) return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

app.get('/health', async (_req, res) => {
  try {
    const [row] = await mysqlPool.query('SELECT 1 + 1 AS result');
    res.json({ ok: true, mysql: true, mongo: mongoose.connection.readyState === 1, row });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

// Minimal auth routes (demo only)
app.post('/auth/login', async (req, res) => {
  const { username, role } = req.body as { username: string; role: Role };
  if (!username || !role) return res.status(400).json({ message: 'username and role required' });
  const token = jwt.sign({ sub: username, role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '30m' });
  res.json({ token });
});

// Example protected route per PRD
app.get('/ai/summary', authMiddleware(['student', 'parent', 'teacher']), async (_req, res) => {
  res.json({ suggestion: "You're doing great this week!", category: 'Study' });
});

// Attendance schema and endpoints
// Minimal schema: attendance(student_id, date, status, created_at)
app.post('/attendance', authMiddleware(['teacher']), async (req, res) => {
  const { studentId, date, status } = req.body as { studentId: string; date: string; status: 'present' | 'absent' | 'late' };
  if (!studentId || !date || !status) return res.status(400).json({ message: 'studentId, date, status required' });
  await mysqlPool.execute(
    'CREATE TABLE IF NOT EXISTS attendance (id INT AUTO_INCREMENT PRIMARY KEY, student_id VARCHAR(64), date DATE, status ENUM("present","absent","late"), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(student_id), UNIQUE KEY uniq_student_date (student_id, date))'
  );
  try {
    await mysqlPool.execute(
      'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)',
      [studentId, date, status]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

app.get('/attendance', authMiddleware(['student', 'parent', 'teacher']), async (req, res) => {
  const user = (req as any).user as JwtPayload;
  const targetStudentId = (req.query.studentId as string) || (user.role === 'student' ? user.sub : undefined);
  if (!targetStudentId) return res.status(400).json({ message: 'studentId required' });
  await mysqlPool.execute(
    'CREATE TABLE IF NOT EXISTS attendance (id INT AUTO_INCREMENT PRIMARY KEY, student_id VARCHAR(64), date DATE, status ENUM("present","absent","late"), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(student_id), UNIQUE KEY uniq_student_date (student_id, date))'
  );
  const [rows] = await mysqlPool.query('SELECT date, status FROM attendance WHERE student_id = ? ORDER BY date DESC LIMIT 200', [targetStudentId]);
  if (user.role === 'parent') {
    // Summarize for parents
    const list = rows as Array<{ date: string; status: string }>; 
    const summary = list.reduce((acc: any, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
    return res.json({ summary });
  }
  res.json({ items: rows });
});

// Grades schema and endpoints
// grades(student_id, subject, term, score)
app.post('/grades', authMiddleware(['teacher']), async (req, res) => {
  const { studentId, subject, term, score } = req.body as { studentId: string; subject: string; term: 'midterm' | 'final' | 'semi'; score: number };
  if (!studentId || !subject || !term || typeof score !== 'number') return res.status(400).json({ message: 'invalid payload' });
  await mysqlPool.execute(
    'CREATE TABLE IF NOT EXISTS grades (id INT AUTO_INCREMENT PRIMARY KEY, student_id VARCHAR(64), subject VARCHAR(64), term ENUM("midterm","final","semi"), score DECIMAL(5,2), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(student_id), INDEX(subject))'
  );
  await mysqlPool.execute(
    'INSERT INTO grades (student_id, subject, term, score) VALUES (?, ?, ?, ?)',
    [studentId, subject, term, score]
  );
  res.json({ ok: true });
});

app.get('/grades', authMiddleware(['student', 'parent', 'teacher']), async (req, res) => {
  const user = (req as any).user as JwtPayload;
  const targetStudentId = (req.query.studentId as string) || (user.role === 'student' ? user.sub : undefined);
  if (!targetStudentId) return res.status(400).json({ message: 'studentId required' });
  await mysqlPool.execute(
    'CREATE TABLE IF NOT EXISTS grades (id INT AUTO_INCREMENT PRIMARY KEY, student_id VARCHAR(64), subject VARCHAR(64), term ENUM("midterm","final","semi"), score DECIMAL(5,2), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(student_id), INDEX(subject))'
  );
  const [rows] = await mysqlPool.query('SELECT subject, term, score, created_at FROM grades WHERE student_id = ? ORDER BY created_at DESC LIMIT 500', [targetStudentId]);
  res.json({ items: rows });
});

// Backend proxy to AI service with anonymization
app.post('/ai/recommendations', authMiddleware(['student', 'parent', 'teacher']), async (req, res) => {
  const user = (req as any).user as JwtPayload;
  const payload = req.body || {};
  const anonymized = {
    student_token: user.sub,
    grades: payload.grades || {},
    attendance: payload.attendance || {},
    habits: payload.habits || {},
    activities: payload.activities || {},
    counseling_keywords: payload.counseling_keywords || [],
  };
  try {
    const aiBase = process.env.AI_BASE_URL || 'http://ai:5000';
    const { data } = await axios.post(`${aiBase}/recommendations`, anonymized, { timeout: 5000 });
    // Filter for parent role to remove sensitive categories if needed
    if (user.role === 'parent') {
      const safe = { ...data, suggestions: (data.suggestions || []).filter((s: any) => s.category !== 'Counseling') };
      return res.json(safe);
    }
    return res.json(data);
  } catch (e) {
    return res.status(502).json({ message: 'AI service unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT}`);
});


