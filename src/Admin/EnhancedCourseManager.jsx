import { useState, useEffect } from 'react';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../utils/dbApi';
import { uploadImage } from '../utils/imageUpload';
import './admin.scss';

const EnhancedCourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    level: 'A1-A2',
    duration: '3 oy',
    students: 0,
    price: '1200000',
    teacher: '',
    description: '',
    category: 'General',
    image: '',
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setLoading(true);
    setCourses(getCourses());
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

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      level: 'A1-A2',
      duration: '3 oy',
      students: 0,
      price: '1200000',
      teacher: '',
      description: '',
      category: 'General',
      image: '',
      status: 'active'
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      level: course.level,
      duration: course.duration,
      students: course.students,
      price: course.price,
      teacher: course.teacher,
      description: course.description,
      category: course.category || 'General',
      image: course.image || '',
      status: course.status
    });
    setImagePreview(course.image || null);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.teacher || !formData.price) {
      alert('Barcha majburiy maydonlarni to\'ldiring!');
      return;
    }

    try {
      if (editingId) {
        updateCourse(editingId, formData);
      } else {
        addCourse(formData);
      }
      loadCourses();
      setShowModal(false);
      alert('Kurs muvaffaqiyatli saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu kursni o\'chirib tashlamoqchisiz?')) {
      try {
        deleteCourse(id);
        loadCourses();
        alert('Kurs o\'chirildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  const categories = ['General', 'IELTS', 'Business', 'Beginners', 'Advanced'];

  return (
    <div className="admin-page courses-page">
      <h1>Kurslar Boshqaruvi</h1>
      <p className="page-subtitle">Barcha mavjud kurslar va ularning ma'lumotlari</p>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Yangi Kurs Qo'shish
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Qidirish (kurs nomi yoki o'qituvchi)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">Barcha kategoriyalar</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Kurs nomi</th>
              <th>Darajasi</th>
              <th>Kategoriya</th>
              <th>O'qituvchi</th>
              <th>Narxi</th>
              <th>Talabalar</th>
              <th>Holati</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.id}>
                  <td>
                    {course.image ? (
                      <img src={course.image} alt={course.title} style={{width: '40px', height: '40px', borderRadius: '4px'}} />
                    ) : (
                      <div style={{width: '40px', height: '40px', background: '#999', borderRadius: '4px'}} />
                    )}
                  </td>
                  <td><strong>{course.title}</strong></td>
                  <td>{course.level}</td>
                  <td><span className="category-badge">{course.category || 'General'}</span></td>
                  <td>{course.teacher}</td>
                  <td>{course.price} so'm</td>
                  <td>{course.students} ta</td>
                  <td>
                    <span className={`status status-${course.status}`}>
                      {course.status === 'active' ? '✓ Faol' : '⊘ O\'chiq'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(course)}>
                      ✏️
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(course.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" style={{textAlign: 'center', padding: '2rem'}}>Kurslar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Kursni Tahrirlash' : 'Yangi Kurs Qo\'shish'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Kurs nomi *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="IELTS Preparation"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Darajasi</label>
                  <select name="level" value={formData.level} onChange={handleInputChange}>
                    <option>A1-A2</option>
                    <option>A1-B1</option>
                    <option>B1-B2</option>
                    <option>B2-C1</option>
                    <option>C1-C2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Kategoriya</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vaqti</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="3 oy"
                  />
                </div>

                <div className="form-group">
                  <label>Narxi (so'm) *</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="1200000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>O'qituvchi *</label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    placeholder="O'qituvchi nomini kiriting"
                  />
                </div>

                <div className="form-group">
                  <label>Talabalar soni</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tavsifi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Kurs haqida qisqacha tavsif"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Kurs rasmi</label>
                <div className="image-upload-area">
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="preview" />
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
                <label>Holati</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Faol</option>
                  <option value="inactive">O'chiq</option>
                </select>
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

export default EnhancedCourseManager;
