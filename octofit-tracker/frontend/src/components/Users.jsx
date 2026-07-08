import { useEffect, useState } from 'react'

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${apiBase}/users/`)
      const data = await response.json()
      setUsers(data.users || data || [])
      setLoading(false)
    }
    fetchUsers()
  }, [apiBase])

  return (
    <div>
      <h1 className="mb-4">Users</h1>
      {loading ? (
        <p>Loading users…</p>
      ) : (
        <div className="row g-3">
          {users.map((user) => (
            <div key={user._id || user.id} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                  <p className="card-text"><strong>Level:</strong> {user.experienceLevel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
