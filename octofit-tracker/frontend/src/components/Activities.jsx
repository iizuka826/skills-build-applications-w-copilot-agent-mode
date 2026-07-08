import { useEffect, useState } from 'react'

export default function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      const response = await fetch(`${apiBase}/activities/`)
      const data = await response.json()
      setActivities(data.activities || data || [])
      setLoading(false)
    }
    fetchActivities()
  }, [apiBase])

  return (
    <div>
      <h1 className="mb-4">Activities</h1>
      {loading ? (
        <p>Loading activities…</p>
      ) : (
        <div className="row g-3">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text mb-1">Duration: {activity.durationMinutes} min</p>
                  <p className="card-text mb-1">Calories: {activity.caloriesBurned}</p>
                  <p className="card-text text-muted">Date: {new Date(activity.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
