// src/adminRoutes.js
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import CourseManager from "./Admin/CourseManager.jsx";
import TeacherManager from "./Admin/TeacherManager.jsx";
import UserManager from "./Admin/UserManager.jsx";
import Settings from "./Admin/Settings.jsx";
import { isAdmin } from "./utils/auth.js";

const RequireAdmin = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/admin/login" replace />;
};

export const adminRoutes = [
  {
    path: "admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "courses", element: <CourseManager /> },
      { path: "teachers", element: <TeacherManager /> },
      { path: "users", element: <UserManager /> },
      { path: "settings", element: <Settings /> },
      { path: "login", element: <Outlet /> } // placeholder for future login page
    ]
  }
];
