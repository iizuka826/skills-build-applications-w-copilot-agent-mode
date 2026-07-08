import { useEffect, useState } from 'react'

export default function Leaderboard({ apiBase }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await fetch(`${apiBase}/leaderboard/`)
      const data = await response.json()
      setEntries(data.leaderboard || data || [])
      setLoading(false)
    }
    fetchLeaderboard()
  }, [apiBase])

  return (
    <div>
      <h1 className="mb-4">Leaderboard</h1>
      {loading ? (
        <p>Loading leaderboard…</p>
      ) : (
        <div className="list-group">
          {entries.map((entry) => (
            <div key={entry._id || `${entry.userId}-${entry.rank}`} className="list-group-item list-group-item-action mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Rank {entry.rank}</strong>
                  <p className="mb-1">Points: {entry.points}</p>
                </div>
                <span className="badge bg-primary rounded-pill">{entry.streakDays}d</span>
              </div>
              <small className="text-muted">User: {entry.userId}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
