// src/Admin/AdminLayout.jsx
import { useState } from "react";
import { NavLink, useNavigate, Navigate, Routes, Route } from "react-router-dom";
import "./admin.scss";
import Dashboard from "./Dashboard.jsx";
import CourseManager from "./CourseManager.jsx";
import TeacherManager from "./TeacherManager.jsx";
import StudentManager from "./StudentManager.jsx";
import Settings from "./Settings.jsx";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊", end: true },
  { to: "/admin/courses", label: "Kurslar", icon: "📚" },
  { to: "/admin/teachers", label: "O'qituvchilar", icon: "👨‍🏫" },
  { to: "/admin/students", label: "Talabalar", icon: "🎓" },
  { to: "/admin/settings", label: "Sozlamalar", icon: "⚙️" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-wrapper">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="admin-logo">O&apos;quv Markaz</h2>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Chiqish
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}

      <div className="admin-main">
        <header className="admin-navbar">
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Menyu"
          >
            ☰
          </button>
          <h1 className="navbar-title">Admin Panel</h1>
          <div className="navbar-user">
            <span className="user-avatar" aria-hidden="true">
              A
            </span>
            <span className="user-name">Administrator</span>
          </div>
        </header>

        <main className="admin-content">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<CourseManager />} />
            <Route path="teachers" element={<TeacherManager />} />
            <Route path="students" element={<StudentManager />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
