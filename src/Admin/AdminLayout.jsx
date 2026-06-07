// src/Admin/AdminLayout.jsx
import { NavLink, useNavigate, Navigate, Routes, Route } from 'react-router-dom'
import './admin.scss'
// Admin pages (placeholders for now)
import Dashboard from './Dashboard.jsx'
import CourseManager from './CourseManager.jsx'
import TeacherManager from './TeacherManager.jsx'
import UserManager from '../Admin/UserManager.jsx'
  // import Settings from './Settings.jsx'
  // import Login from './Login.jsx'

const AdminLayout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  // Redirect to login if not authenticated (except when already on login page)
  if (!token && window.location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">O‘quv‑Markaz Admin</h2>
        <nav className="admin-nav">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Kurslar
          </NavLink>
          <NavLink
            to="/admin/teachers"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            O‘qituvchilar
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Foydalanuvchilar
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Sozlamalar
          </NavLink>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseManager />} />
          <Route path="teachers" element={<TeacherManager />} />
          <Route path="users" element={<UserManager />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminLayout
