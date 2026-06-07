import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import db from '../../../db.json'
import RegistrationModal from '../../Components/RegistrationModal/RegistrationModal'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [showRegModal, setShowRegModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menuOpen])

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const openRegistration = () => setShowRegModal(true)
  const closeRegistration = () => setShowRegModal(false)

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* LOGO */}
          <div className="navbar__logo">
            <img
              src={db.navbar.logo}
              alt="O'QUV MARKAZ"
              className="navbar__logo-img"
            />
          </div>

          <nav
            className={`navbar__menu ${menuOpen ? 'navbar__menu--active' : ''}`}
          >
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Bosh sahifa
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              Biz haqimizda
            </NavLink>
            <NavLink to="/teachers" onClick={() => setMenuOpen(false)}>
              O‘qituvchilar
            </NavLink>
            <NavLink to="/courses" onClick={() => setMenuOpen(false)}>
              Kurslar
            </NavLink>
          </nav>

          <div className="navbar__actions">
            <button
              className="navbar__theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Dark mode"
            >
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

      {/* Ro‘yxatdan o‘tish modal oynasi */}
      <RegistrationModal
        isOpen={showRegModal}
        onClose={closeRegistration}
        courseTitle="Umumiy so‘rov"
      />
    </>
  )
}

export default Navbar