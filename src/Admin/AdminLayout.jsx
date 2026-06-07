// src/Admin/AdminLayout.jsx
import { NavLink, useNavigate, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './admin.scss'
import Dashboard from './Dashboard.jsx'
import EnhancedCourseManager from './EnhancedCourseManager.jsx'
import EnhancedTeacherManager from './EnhancedTeacherManager.jsx'
import UserManager from '../Admin/UserManager.jsx'
import RegistrationsManager from './RegistrationsManager.jsx'
import EnhancedSettingsManager from './EnhancedSettingsManager.jsx'
import Profile from './Profile.jsx'
import TestManager from './TestManager.jsx'
import HomepageManager from './HomepageManager.jsx'
import AboutManager from './AboutManager.jsx'
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

          <NavLink
            to="/admin/tests"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            ❓ Testlar
          </NavLink>
          
          <div className="nav-divider">SAYT TARKIBI</div>

          <NavLink
            to="/admin/homepage"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            🏠 Bosh Sahifa
          </NavLink>

          <NavLink
            to="/admin/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setSidebarOpen(false)}
          >
            ℹ️ Biz Haqimizda
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
          <Route path="courses" element={<EnhancedCourseManager />} />
          <Route path="teachers" element={<EnhancedTeacherManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="registrations" element={<RegistrationsManager />} />
          <Route path="tests" element={<TestManager />} />
          <Route path="homepage" element={<HomepageManager />} />
          <Route path="about" element={<AboutManager />} />
          <Route path="settings" element={<EnhancedSettingsManager />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminLayout
