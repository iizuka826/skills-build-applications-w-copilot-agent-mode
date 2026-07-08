import { NavLink, Route, Routes } from 'react-router-dom'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">OctoFit Multi-Tier Dashboard</h1>
              <p className="lead text-muted mb-4">
                Navigate the presentation tier with React Router and fetch data from the backend API using Vite environment variables.
              </p>
              <div className="alert alert-info">
                <strong>VITE_CODESPACE_NAME</strong> should be defined in <code>.env.local</code> for Codespaces.
              </div>
              <div className="d-flex flex-wrap gap-2">
                <NavLink className="btn btn-outline-primary" to="/users">Users</NavLink>
                <NavLink className="btn btn-outline-primary" to="/teams">Teams</NavLink>
                <NavLink className="btn btn-outline-primary" to="/activities">Activities</NavLink>
                <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="btn btn-outline-primary" to="/workouts">Workouts</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <Routes>
                <Route path="/users" element={<Users apiBase={apiBase} />} />
                <Route path="/teams" element={<Teams apiBase={apiBase} />} />
                <Route path="/activities" element={<Activities apiBase={apiBase} />} />
                <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
                <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
                <Route path="/*" element={<div className="text-center py-5">Select a section above to view data from the OctoFit API.</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
