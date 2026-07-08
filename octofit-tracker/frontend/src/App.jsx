import { useEffect, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [users, setUsers] = useState([])
  const [teams, setTeams] = useState([])
  const [activities, setActivities] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [usersRes, teamsRes, activitiesRes, leaderboardRes, workoutsRes] = await Promise.all([
          fetch(`${API_BASE}/api/users`),
          fetch(`${API_BASE}/api/teams`),
          fetch(`${API_BASE}/api/activities`),
          fetch(`${API_BASE}/api/leaderboard`),
          fetch(`${API_BASE}/api/workouts`),
        ])

        const [usersData, teamsData, activitiesData, leaderboardData, workoutsData] = await Promise.all([
          usersRes.json(),
          teamsRes.json(),
          activitiesRes.json(),
          leaderboardRes.json(),
          workoutsRes.json(),
        ])

        setUsers(usersData.users || [])
        setTeams(teamsData.teams || [])
        setActivities(activitiesData.activities || [])
        setLeaderboard(leaderboardData.leaderboard || [])
        setWorkouts(workoutsData.workouts || [])
      } catch (error) {
        console.error('Failed to load OctoFit data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <main className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Live fitness insights</h1>
              <p className="lead text-muted mb-4">
                Explore your seeded users, teams, activities, leaderboard entries, and workout suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted">Loading dashboard data…</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h5 mb-3">Members</h2>
                <ul className="list-group list-group-flush">
                  {users.map((user) => (
                    <li key={user._id} className="list-group-item px-0">
                      <strong>{user.name}</strong>
                      <div className="text-muted small">{user.fitnessGoal} · {user.experienceLevel}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h5 mb-3">Teams</h2>
                <ul className="list-group list-group-flush">
                  {teams.map((team) => (
                    <li key={team._id} className="list-group-item px-0">
                      <strong>{team.name}</strong>
                      <div className="text-muted small">{team.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h5 mb-3">Recent activities</h2>
                <ul className="list-group list-group-flush">
                  {activities.map((activity) => (
                    <li key={activity._id} className="list-group-item px-0">
                      <strong>{activity.type}</strong>
                      <div className="text-muted small">{activity.durationMinutes} min · {activity.caloriesBurned} kcal</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h5 mb-3">Leaderboard</h2>
                <ul className="list-group list-group-flush">
                  {leaderboard.map((entry) => (
                    <li key={entry._id} className="list-group-item px-0">
                      <strong>Rank {entry.rank}</strong>
                      <div className="text-muted small">{entry.points} pts · {entry.streakDays} day streak</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 mb-3">Workout suggestions</h2>
                <div className="row g-3">
                  {workouts.map((workout) => (
                    <div key={workout._id} className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <h3 className="h6 fw-bold">{workout.title}</h3>
                        <div className="text-muted small">{workout.focus} · {workout.difficulty}</div>
                        <div className="text-muted small">{workout.estimatedDurationMinutes} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
