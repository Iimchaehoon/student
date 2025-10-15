"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/src/lib/api'

type Grade = { subject: string; term: 'midterm'|'final'|'semi'; score: number; created_at: string }

export default function GradesPage() {
  const [items, setItems] = useState<Grade[]|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    apiFetch('/grades').then(res => setItems(res.items || [])).catch(e => setError(String(e)))
  }, [])

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Grades</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {items && (
        <div className="border rounded">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-100 dark:bg-gray-800"><th className="p-2 text-left">Subject</th><th className="p-2 text-left">Term</th><th className="p-2 text-left">Score</th><th className="p-2 text-left">Date</th></tr></thead>
            <tbody>
              {items.map((g,i)=> (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="p-2">{g.subject}</td>
                  <td className="p-2 capitalize">{g.term}</td>
                  <td className="p-2">{g.score}</td>
                  <td className="p-2">{new Date(g.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}


