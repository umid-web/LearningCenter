// src/App/App.jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../Main/Navbar/Navbar';
import Home from '../Pages/Home';
import Footer from '../Main/Footer/Footer';
import AboutPage from '../Pages/About';
import TeachersPage from '../Pages/TeachersPage';
import Course from '../Pages/Cource';
import Test from '../Pages/Test';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/test" element={<Test />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
