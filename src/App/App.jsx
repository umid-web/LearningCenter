// src/App/App.jsx
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../Main/Navbar/Navbar';
import Home from '../Pages/Home';
import Footer from '../Main/Footer/Footer';
import AboutPage from '../Pages/About';
import TeachersPage from '../Pages/TeachersPage';
import Courses from '../Components/CourseComp/Courses';
import OnlineTest from '../Components/OnlineTest/OnlineTest';
import AdminLayout from '../Admin/AdminLayout.jsx';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/test" element={<OnlineTest />} />
        {/* Admin protected area */}
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
