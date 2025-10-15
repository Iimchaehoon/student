"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/src/lib/api'

export default function AttendancePage() {
  const [items, setItems] = useState<{date: string; status: string}[]|null>(null)
  const [summary, setSummary] = useState<Record<string, number>|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    apiFetch('/attendance')
      .then(res => {
        if (res.items) setItems(res.items)
        if (res.summary) setSummary(res.summary)
      })
      .catch(e => setError(String(e)))
  }, [])

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Attendance</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {summary && (
        <div className="border rounded p-3">
          <h2 className="font-medium mb-2">Summary</h2>
          <pre className="text-sm">{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}
      {items && (
        <div className="border rounded">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-100 dark:bg-gray-800"><th className="text-left p-2">Date</th><th className="text-left p-2">Status</th></tr></thead>
            <tbody>
              {items.map((r,i)=> (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="p-2">{r.date}</td>
                  <td className="p-2 capitalize">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}


