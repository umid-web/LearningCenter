import { useEffect, useState } from 'react'
import axios from 'axios'
import RegistrationModal from '../RegistrationModal/RegistrationModal'
import './Courses.scss'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showRegModal, setShowRegModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/db.json')
        setCourses(res.data.courses)
      } catch (error) {
        console.error('Maʼlumot yuklashda xatolik:', error)
        try {
          const res2 = await axios.get('http://localhost:3001/courses')
          setCourses(res2.data)
        } catch (err) {
          console.error('Ikkala manba ham ishlamadi:', err)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedCourse])

  const openModal = (course) => {
    setSelectedCourse(course)
    setShowRegModal(false)
  }

  const closeModal = () => {
    setSelectedCourse(null)
  }

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="spinner"></div>
        <p>Yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <section className="courses">
      <div className="container">
        <div className="courses__header">
          <h2>Kurslarimiz</h2>
          <p>Professional ingliz tili kurslari</p>
        </div>
        <div className="courses__grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-card__icon-wrapper">
                <div className="course-card__icon">{course.duration}</div>
              </div>
              <h3>{course.title}</h3>
              <div className="course-card__meta">
                <span className="meta-item">
                  <strong>Daraja:</strong> {course.level}
                </span>
                <span className="meta-item">
                  <strong>Davomiyligi:</strong> {course.duration}
                </span>
                {course.price && (
                  <span className="meta-item price">
                    <strong>Narxi:</strong> {course.price}
                  </span>
                )}
              </div>
              <button onClick={() => openModal(course)}>Batafsil</button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL – KURS HAQIDA MA'LUMOT */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-icon">{selectedCourse.duration}</div>
            <h2 className="modal-title">{selectedCourse.title}</h2>
            <div className="modal-meta">
              <span>📊 Daraja: {selectedCourse.level}</span>
              <span>⏱ Davomiyligi: {selectedCourse.duration}</span>
              {selectedCourse.price && <span>💰 Narxi: {selectedCourse.price}</span>}
            </div>
            <div className="modal-description">
              <h4>Kurs haqida to‘liq ma’lumot</h4>
              <p>{selectedCourse.fullDescription || 'Kurs haqida batafsil maʼlumot mavjud emas.'}</p>
              <h4>Kurikulum (asosiy mavzular)</h4>
              <ul>
                {(selectedCourse.curriculum || [
                  'Grammar & Vocabulary',
                  'Speaking & Listening',
                  'Writing & Reading',
                  'Imtihon tayyorgarligi',
                ]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              className="modal-apply"
              onClick={() => setShowRegModal(true)}
            >
              Darsga yozilish
            </button>
          </div>
        </div>
      )}

      {/* ALOHIDA RO‘YXATDAN O‘TISH MODALI */}
      <RegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        courseTitle={selectedCourse?.title}
      />
    </section>
  )
}

export default Courses