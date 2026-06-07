// src/Admin/CourseManager.jsx
import { useState, useEffect } from 'react';
import { getInitialData, saveData } from '../utils/auth';
import './admin.scss';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    level: 'A1-B1',
    duration: '3 oy',
    students: 0,
    price: '1200000',
    teacher: '',
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setLoading(true);
    const data = getInitialData();
    setCourses(data.courses);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      level: 'A1-B1',
      duration: '3 oy',
      students: 0,
      price: '1200000',
      teacher: '',
      status: 'active'
    });
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
      status: course.status
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.teacher || !formData.price) {
      alert('Barcha maydonlarni to\'ldiring!');
      return;
    }

    let updatedCourses;
    if (editingId) {
      updatedCourses = courses.map(c =>
        c.id === editingId ? { ...c, ...formData } : c
      );
    } else {
      const newId = Math.max(...courses.map(c => c.id), 0) + 1;
      updatedCourses = [...courses, { id: newId, ...formData }];
    }

    setCourses(updatedCourses);
    const data = getInitialData();
    data.courses = updatedCourses;
    saveData(data);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu kursni o\'chirib tashlamoqchisiz?')) {
      const updatedCourses = courses.filter(c => c.id !== id);
      setCourses(updatedCourses);
      const data = getInitialData();
      data.courses = updatedCourses;
      saveData(data);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page courses-page">
      <h1>Kurslar Boshqaruvi</h1>
      <p className="page-subtitle">Barcha mavjud kurslar va ularning ma'lumotlari</p>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNew}>
          ➕ Yangi Kurs Qo'shish
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
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Kurs nomi</th>
              <th>Darajasi</th>
              <th>Vaqti</th>
              <th>O'qituvchi</th>
              <th>Talabalar</th>
              <th>Narxi</th>
              <th>Holati</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.id}>
                  <td><strong>{course.title}</strong></td>
                  <td>{course.level}</td>
                  <td>{course.duration}</td>
                  <td>{course.teacher}</td>
                  <td>{course.students} ta</td>
                  <td>{course.price} so'm</td>
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
              <tr><td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>Kurslar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                  <label>Vaqti</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="3 oy"
                  />
                </div>
              </div>

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

              <div className="form-row">
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
              <button className="btn btn-primary" onClick={handleSave}>Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;
