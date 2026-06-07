// src/Admin/Settings.jsx
import { useState } from 'react';
import './admin.scss';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'O\'quv-Markaz',
    email: 'info@ieltscenter.uz',
    phone: '+998 90 160 05 28',
    address: 'Tashkent, Uzbekistan',
    timezone: 'UTC+5',
    language: 'uz',
    maintenanceMode: false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-page settings-page">
      <h1>Sozlamalar</h1>
      
      <div className="settings-container">
        <div className="settings-card">
          <h2>Sayt sozlamalari</h2>
          
          <div className="form-group">
            <label htmlFor="siteName">Sayt nomi</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Manzil</label>
            <input
              type="text"
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Vaqt mintaqasi</label>
            <select id="timezone" name="timezone" value={settings.timezone} onChange={handleChange}>
              <option>UTC+0</option>
              <option>UTC+2</option>
              <option>UTC+5</option>
              <option>UTC+8</option>
              <option>UTC+12</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="language">Til</label>
            <select id="language" name="language" value={settings.language} onChange={handleChange}>
              <option value="uz">O'zbek</option>
              <option value="ru">Rus</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <label htmlFor="maintenanceMode">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              Xizmatni to'xtatish rejimi
            </label>
          </div>

          <button className="settings-save-btn" onClick={handleSave}>
            💾 Saqlash
          </button>

          {saved && <p className="success-message">Sozlamalar saqlandi!</p>}
        </div>

        <div className="settings-card">
          <h2>Tizim ma'lumotlari</h2>
          <div className="info-list">
            <p><strong>Versiya:</strong> 1.0.0</p>
            <p><strong>Platform:</strong> React 19</p>
            <p><strong>Router:</strong> React Router v7</p>
            <p><strong>Styling:</strong> SCSS</p>
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString('uz-UZ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
