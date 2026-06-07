import { useState, useEffect } from 'react';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from '../utils/dbApi';
import { uploadImage } from '../utils/imageUpload';
import './admin.scss';

const EnhancedTeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [courseInput, setCourseInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    experience: '',
    email: '',
    phone: '',
    image: '',
    courses: [],
    rating: 4.5,
    reviews: 0,
    bio: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    setLoading(true);
    setTeachers(getTeachers());
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
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

  const addCourse = () => {
    if (courseInput.trim() && !formData.courses.includes(courseInput)) {
      setFormData(prev => ({
        ...prev,
        courses: [...prev.courses, courseInput]
      }));
      setCourseInput('');
    }
  };

  const removeCourse = (course) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c !== course)
    }));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      qualification: '',
      experience: '',
      email: '',
      phone: '',
      image: '',
      courses: [],
      rating: 4.5,
      reviews: 0,
      bio: ''
    });
    setImagePreview(null);
    setCourseInput('');
    setShowModal(true);
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({
      name: teacher.name,
      qualification: teacher.qualification,
      experience: teacher.experience,
      email: teacher.email,
      phone: teacher.phone,
      image: teacher.image || '',
      courses: [...(teacher.courses || [])],
      rating: teacher.rating || 4.5,
      reviews: teacher.reviews || 0,
      bio: teacher.bio || ''
    });
    setImagePreview(teacher.image || null);
    setCourseInput('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.qualification || !formData.email || !formData.phone) {
      alert('Barcha majburiy maydonlarni to\'ldiring!');
      return;
    }

    try {
      if (editingId) {
        updateTeacher(editingId, formData);
      } else {
        addTeacher(formData);
      }
      loadTeachers();
      setShowModal(false);
      alert('O\'qituvchi muvaffaqiyatli saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu o\'qituvchini o\'chirib tashlamoqchisiz?')) {
      try {
        deleteTeacher(id);
        loadTeachers();
        alert('O\'qituvchi o\'chirildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page teachers-page">
      <h1>O'qituvchilar Boshqaruvi</h1>
      <p className="page-subtitle">Barcha sertifikatlangan va tajribali ustozlar</p>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Yangi O'qituvchi Qo'shish
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Qidirish (ism yoki email)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Ism</th>
              <th>Sertifikati</th>
              <th>Tajriba</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Reytingi</th>
              <th>Kurslar</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>
                    {teacher.image ? (
                      <img src={teacher.image} alt={teacher.name} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                    ) : (
                      <div style={{width: '40px', height: '40px', background: '#999', borderRadius: '50%'}} />
                    )}
                  </td>
                  <td><strong>{teacher.name}</strong></td>
                  <td>{teacher.qualification}</td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className="rating-badge">
                      ⭐ {teacher.rating || 4.5} ({teacher.reviews || 0})
                    </span>
                  </td>
                  <td>
                    <div className="course-list">
                      {teacher.courses && teacher.courses.map((course, idx) => (
                        <span key={idx} className="course-badge">{course}</span>
                      ))}
                    </div>
                  </td>
                  <td className="action-buttons">
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(teacher)}>
                      ✏️
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(teacher.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" style={{textAlign: 'center', padding: '2rem'}}>O'qituvchilar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'O\'qituvchini Tahrirlash' : 'Yangi O\'qituvchi Qo\'shish'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Ism *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="To'liq ismi"
                  />
                </div>

                <div className="form-group">
                  <label>Reytingi</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Sertifikati / Darajasi *</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="IELTS 8.5, CEFR C2, ..."
                />
              </div>

              <div className="form-group">
                <label>Tajriba *</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="10 yil"
                />
              </div>

              <div className="form-group">
                <label>Biografiya</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="O'qituvchi haqida qisqacha ma'lumot"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="teacher@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Rasm</label>
                <div className="image-upload-area">
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="preview" style={{borderRadius: '8px'}} />
                      <button type="button" className="btn-remove" onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}>
                        ✕ O'chirish
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  <p className="upload-hint">{uploading ? 'Yuklanmoqda...' : 'Rasm tanlang (max 1MB)'}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Kurslar</label>
                <div className="course-input-group">
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    placeholder="Kurs nomini kiriting"
                    onKeyPress={(e) => e.key === 'Enter' && addCourse()}
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={addCourse}>
                    Qo'shish
                  </button>
                </div>
                <div className="courses-display">
                  {formData.courses.map((course, idx) => (
                    <div key={idx} className="course-item">
                      <span>{course}</span>
                      <button type="button" className="btn-remove" onClick={() => removeCourse(course)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Bekor qilish</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={uploading}>
                {uploading ? 'Yuklanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTeacherManager;
