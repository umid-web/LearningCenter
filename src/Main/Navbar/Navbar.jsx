import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.scss';
import db from '../../../public/db.json';
import RegistrationModal from '../../Components/RegistrationModal/RegistrationModal';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showRegModal, setShowRegModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [menuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOpenRegistrationModal = () => {
      console.log('openRegistrationModal event received');
      setShowRegModal(true);
    };

    window.addEventListener('openRegistrationModal', handleOpenRegistrationModal);

    return () => {
      window.removeEventListener('openRegistrationModal', handleOpenRegistrationModal);
    };
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const openRegistration = () => setShowRegModal(true);
  const closeRegistration = () => setShowRegModal(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            {db.navbar?.logo && <img src={db.navbar.logo} alt="O'QUV MARKAZ" />}
          </Link>

          <nav className={`navbar__menu ${menuOpen ? 'navbar__menu--active' : ''}`}>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>Biz haqimizda</NavLink>
            <NavLink to="/teachers" onClick={() => setMenuOpen(false)}>O‘qituvchilar</NavLink>
            <NavLink to="/courses" onClick={() => setMenuOpen(false)}>Kurslar</NavLink>
            {/* Dark mode toggle inside menu on mobile */}
            <button className="navbar__mobile-theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </nav>

          <div className="navbar__actions">
            <button className="navbar__theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="navbar__btn" onClick={openRegistration}>
              <span>Bog‘lanish</span>
            </button>
            <button
              className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <RegistrationModal
        isOpen={showRegModal}
        onClose={closeRegistration}
        courseTitle="Umumiy so‘rov"
      />
    </>
  );
};

export default Navbar;