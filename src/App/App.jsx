// src/App/App.jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Main/Navbar/Navbar';
import Home from '../Pages/Home';
import Footer from '../Main/Footer/Footer';
import AboutPage from '../Pages/About';
import TeachersPage from '../Pages/TeachersPage';
import Courses from '../Components/CourseComp/Courses';
import OnlineTest from '../Components/OnlineTest/OnlineTest';
import AdminLayout from '../Admin/AdminLayout.jsx';
import Login from '../Admin/Login.jsx';

function App() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminArea && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/test" element={<OnlineTest />} />
        {/* Admin login page */}
        <Route path="/admin/login" element={<Login />} />
        {/* Admin protected area */}
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminArea && <Footer />}
    </>
  );
}

export default App;
