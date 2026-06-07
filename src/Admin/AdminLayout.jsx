// src/Admin/AdminLayout.jsx
import { NavLink, useNavigate, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './admin.scss'
import Dashboard from './Dashboard.jsx'
import CourseManager from './CourseManager.jsx'
import TeacherManager from './TeacherManager.jsx'
import UserManager from '../Admin/UserManager.jsx'
import RegistrationsManager from './RegistrationsManager.jsx'
import Settings from './Settings.jsx'
import Profile from './Profile.jsx'
import { getCurrentUser, logout as logoutUser } from '../utils/auth'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('adminToken')
  const user = getCurrentUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    if (window.confirm('Chiqishni tasdiqlamoqchisiz?')) {
      logoutUser()
      navigate('/admin/login', { replace: true })
    }
  }

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  const isLoginPage = location.pathname === '/admin/login'

  if (isLoginPage) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <div className="admin-wrapper">
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <h2 className="admin-logo">O'quv‑Markaz</h2>
        <p className="admin-subtitle">Administrator Paneli</p>
        
        <nav className="admin-nav">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            📊 Dashboard
          </NavLink>
          
          <div className="nav-divider">BOSHQARUV</div>
          
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            👥 Foydalanuvchilar
          </NavLink>
          
          <NavLink
            to="/admin/teachers"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            👨‍🏫 O'qituvchilar
          </NavLink>
          
          <NavLink
            to="/admin/courses"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            📚 Kurslar
          </NavLink>
          
          <NavLink
            to="/admin/registrations"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            📋 Ro'yxatlanishlar
          </NavLink>
          
          <div className="nav-divider">SOZLAMALAR</div>
          
          <NavLink
            to="/admin/profile"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            🧑 Shaxsiy Kabinet
          </NavLink>
          
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            ⚙️ Sozlamalar
          </NavLink>
        </nav>

        <div className="admin-user-card">
          <p className="user-name">{user?.name || 'Administrator'}</p>
          <p className="user-email">{user?.email || 'admin@example.com'}</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          🚪 Chiqish
        </button>
      </aside>

      <main className="admin-content">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseManager />} />
          <Route path="teachers" element={<TeacherManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="registrations" element={<RegistrationsManager />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminLayout
