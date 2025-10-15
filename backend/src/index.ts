import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
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

app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT}`);
});


