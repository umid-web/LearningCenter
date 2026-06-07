import { useState, useEffect } from 'react'
import './RegistrationModal.scss'

const RegistrationModal = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [formSuccess, setFormSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.startsWith('998')) value = value.slice(3)
    let formatted = '+998'
    if (value.length > 0) formatted += ' ' + value.substring(0, 2)
    if (value.length > 2) formatted += ' ' + value.substring(2, 5)
    if (value.length > 5) formatted += ' ' + value.substring(5, 7)
    if (value.length > 7) formatted += ' ' + value.substring(7, 9)
    setFormData({ ...formData, phone: formatted })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Ro‘yxatdan o‘tish:', {
      course: courseTitle,
      name: formData.name,
      phone: formData.phone,
    })
    setFormSuccess(true)
    setTimeout(() => {
      onClose()
      setFormSuccess(false)
      setFormData({ name: '', phone: '' })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="reg-modal-overlay" onClick={onClose}>
      <div className="reg-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reg-modal-close" onClick={onClose}>✕</button>
        <h3 className="reg-modal-title">
          Bepul darsga yozilish uchun ro'yxatdan o'ting.
        </h3>
        {formSuccess ? (
          <div className="reg-success">
            ✅ So‘rovingiz qabul qilindi! Tez orada bog‘lanamiz.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="reg-form-group">
              <input
                type="text"
                placeholder="Ism"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="reg-form-group">
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={17}
                required
              />
            </div>
            <button type="submit" className="reg-submit-btn">Yuborish</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegistrationModal