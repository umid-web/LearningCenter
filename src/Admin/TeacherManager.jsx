
// src/Admin/TeacherManager.jsx
import { useState, useEffect } from 'react';
import { getInitialData, saveData } from '../utils/auth';
import './admin.scss';

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    experience: '',
    email: '',
    phone: '',
    courses: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [courseInput, setCourseInput] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    setLoading(true);
    const data = getInitialData();
    setTeachers(data.teachers);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCourse = () => {
    if (courseInput && !formData.courses.includes(courseInput)) {
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
      courses: []
    });
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
      courses: [...teacher.courses]
    });
    setCourseInput('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.qualification || !formData.email || !formData.phone) {
      alert('Barcha maydonlarni to\'ldiring!');
      return;
    }

    let updatedTeachers;
    if (editingId) {
      updatedTeachers = teachers.map(t =>
        t.id === editingId ? { ...t, ...formData } : t
      );
    } else {
      const newId = Math.max(...teachers.map(t => t.id), 0) + 1;
      updatedTeachers = [...teachers, { id: newId, ...formData }];
    }

    setTeachers(updatedTeachers);
    const data = getInitialData();
    data.teachers = updatedTeachers;
    saveData(data);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu o\'qituvchini o\'chirib tashlamoqchisiz?')) {
      const updatedTeachers = teachers.filter(t => t.id !== id);
      setTeachers(updatedTeachers);
      const data = getInitialData();
      data.teachers = updatedTeachers;
      saveData(data);
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
          ➕ Yangi O'qituvchi Qo'shish
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
              <th>Ism</th>
              <th>Sertifikati</th>
              <th>Tajriba</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Kurslar</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.qualification}</td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <div className="course-list">
                      {teacher.courses.map((course, idx) => (
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
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>O'qituvchilar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'O\'qituvchini Tahrirlash' : 'Yangi O\'qituvchi Qo\'shish'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
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
              <button className="btn btn-primary" onClick={handleSave}>Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManager;
