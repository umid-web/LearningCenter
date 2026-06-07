import { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../utils/dbApi';
import { uploadImage } from '../utils/imageUpload';
import './admin.scss';

const AboutManager = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mission: '',
    vision: '',
    image: '',
    directions: [],
    stats: {
      students: 0,
      teachers: 0,
      courses: 0,
      successRate: 0
    }
  });

  const [newDirection, setNewDirection] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = () => {
    setLoading(true);
    const data = getAbout();
    setFormData(data);
    if (data.image) {
      setImagePreview(data.image);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: parseInt(value)
      }
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true);
        const base64 = await uploadImage(file, 1000);
        setFormData(prev => ({
          ...prev,
          image: base64
        }));
        setImagePreview(base64);
      } catch (error) {
        alert(`Xato: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddDirection = () => {
    if (newDirection.title.trim() && newDirection.description.trim()) {
      setFormData(prev => ({
        ...prev,
        directions: [...prev.directions, newDirection]
      }));
      setNewDirection({
        title: '',
        description: ''
      });
    }
  };

  const handleRemoveDirection = (index) => {
    setFormData(prev => ({
      ...prev,
      directions: prev.directions.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    try {
      updateAbout(formData);
      setSuccessMessage('Batafsillaryum muvaffaqiyatli saqlandi!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page about-manager">
      <h1>Biz Haqimizda Sahifasi</h1>
      <p className="page-subtitle">Saytning "Biz haqimizda" sahifasini tahrirlash</p>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-section">
        <h2>Asosiy Ma'lumotlar</h2>

        <div className="form-group">
          <label>Sarlavha</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Biz haqimizda"
          />
        </div>

        <div className="form-group">
          <label>Tavsif</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Sayt haqida qisqacha tavsif"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Rasm</label>
          <div className="image-upload-area">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="About" />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({...prev, image: ''}));
                  }}
                >
                  ✕ O'chirish
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <p className="upload-hint">{uploading ? 'Yuklanmoqda...' : 'Rasm tanlang (max 1MB)'}</p>
          </div>
        </div>
      </div>

      <div className="form-section" style={{marginTop: '2rem'}}>
        <h2>Missiya va Viziya</h2>

        <div className="form-group">
          <label>Missiya</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleInputChange}
            placeholder="Bizning missiyamiz..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Viziya</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleInputChange}
            placeholder="Bizning viziyamiz..."
            rows="3"
          />
        </div>
      </div>

      <div className="form-section" style={{marginTop: '2rem'}}>
        <h2>Statistika</h2>

        <div className="form-row">
          <div className="form-group">
            <label>O'quvchilar Soni</label>
            <input
              type="number"
              name="students"
              value={formData.stats.students}
              onChange={handleStatChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>O'qituvchilar Soni</label>
            <input
              type="number"
              name="teachers"
              value={formData.stats.teachers}
              onChange={handleStatChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kurslar Soni</label>
            <input
              type="number"
              name="courses"
              value={formData.stats.courses}
              onChange={handleStatChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Muvaffaqiyat Darajasi (%)</label>
            <input
              type="number"
              name="successRate"
              value={formData.stats.successRate}
              onChange={handleStatChange}
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      <div className="form-section" style={{marginTop: '2rem'}}>
        <h2>Yo'nalishlar</h2>

        <div style={{marginBottom: '2rem'}}>
          <div className="form-group">
            <label>Yo'nalish Nomi</label>
            <input
              type="text"
              value={newDirection.title}
              onChange={(e) => setNewDirection({...newDirection, title: e.target.value})}
              placeholder="Masalan: English for Beginners"
            />
          </div>

          <div className="form-group">
            <label>Tavsif</label>
            <textarea
              value={newDirection.description}
              onChange={(e) => setNewDirection({...newDirection, description: e.target.value})}
              placeholder="Yo'nalish haqida qisqacha tavsif"
              rows="2"
            />
          </div>

          <button type="button" className="btn btn-secondary" onClick={handleAddDirection}>
            + Yo'nalish Qo'shish
          </button>
        </div>

        {formData.directions?.map((direction, idx) => (
          <div key={idx} className="direction-item" style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div>
                <h4 style={{margin: '0 0 0.5rem', color: 'var(--admin-accent)'}}>{direction.title}</h4>
                <p style={{margin: '0', color: '#e0e0e0', opacity: 0.8}}>{direction.description}</p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-delete"
                onClick={() => handleRemoveDirection(idx)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSave} style={{marginTop: '2rem'}}>
        Saqlash
      </button>
    </div>
  );
};

export default AboutManager;
