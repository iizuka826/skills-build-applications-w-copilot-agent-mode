import { useEffect, useState } from 'react'

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      const response = await fetch(`${apiBase}/teams/`)
      const data = await response.json()
      setTeams(data.teams || data || [])
      setLoading(false)
    }
    fetchTeams()
  }, [apiBase])

  return (
    <div>
      <h1 className="mb-4">Teams</h1>
      {loading ? (
        <p>Loading teams…</p>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text mb-2">{team.description}</p>
                  <p className="card-text text-muted">Members: {team.members?.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
