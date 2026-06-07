// src/Admin/Profile.jsx
import { useState } from 'react';
import { getCurrentUser } from '../utils/auth';
import './admin.scss';

const Profile = () => {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Parollar mos kelmadi!');
      return;
    }

    localStorage.setItem('adminProfile', JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return <div className="admin-page"><p>Foydalanuvchi ma'lumotlari topilmadi</p></div>;
  }

  return (
    <div className="admin-page profile-page">
      <h1>Shaxsiy Kabinet</h1>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">👤</div>
          </div>

          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>

        <div className="settings-card">
          <h2>Shaxsiy Ma'lumotlar</h2>

          <div className="form-group">
            <label htmlFor="name">To'liq Ism</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <h2 style={{marginTop: '2rem'}}>Parolni O'zgartirish</h2>

          <div className="form-group">
            <label htmlFor="newPassword">Yangi Parol</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Yangi parolni kiriting"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Parolni Tasdiqlang</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Parolni takroriy kiriting"
            />
          </div>

          <button className="btn btn-primary" onClick={handleSave} style={{marginTop: '1rem'}}>
            💾 Saqlash
          </button>

          {saved && <p className="success-message">Ma'lumotlar saqlandi!</p>}
        </div>

        <div className="settings-card">
          <h2>Tizim Ma'lumotlari</h2>
          <div className="info-list">
            <p><strong>Rol:</strong> Administrator</p>
            <p><strong>Status:</strong> Faol</p>
            <p><strong>Kirish sanasi:</strong> {new Date().toLocaleDateString('uz-UZ')}</p>
            <p><strong>Oxirgi faoliyat:</strong> Hozir</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
