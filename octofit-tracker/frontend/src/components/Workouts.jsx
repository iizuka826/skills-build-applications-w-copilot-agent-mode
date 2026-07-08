import { useEffect, useState } from 'react'

export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch(`${apiBase}/workouts/`)
      const data = await response.json()
      setWorkouts(data.workouts || data || [])
      setLoading(false)
    }
    fetchWorkouts()
  }, [apiBase])

  return (
    <div>
      <h1 className="mb-4">Workouts</h1>
      {loading ? (
        <p>Loading workouts…</p>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.title} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text mb-1">Focus: {workout.focus}</p>
                  <p className="card-text mb-1">Difficulty: {workout.difficulty}</p>
                  <p className="card-text text-muted">Duration: {workout.estimatedDurationMinutes} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
