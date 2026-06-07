// src/Admin/UserManager.jsx
import { useState, useEffect } from 'react';
import { getInitialData, saveData } from '../utils/auth';
import './admin.scss';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseLevel: 'B1',
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    const data = getInitialData();
    setUsers(data.users);
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
      name: '',
      email: '',
      phone: '',
      courseLevel: 'B1',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      courseLevel: user.courseLevel,
      status: user.status
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Barcha maydonlarni to\'ldiring!');
      return;
    }

    let updatedUsers;
    if (editingId) {
      updatedUsers = users.map(u =>
        u.id === editingId
          ? { ...u, ...formData, registeredDate: u.registeredDate }
          : u
      );
    } else {
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      updatedUsers = [...users, {
        id: newId,
        ...formData,
        registeredDate: new Date().toISOString().split('T')[0]
      }];
    }

    setUsers(updatedUsers);
    const data = getInitialData();
    data.users = updatedUsers;
    saveData(data);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu foydalanuvchini o\'chirib tashlamoqchisiz?')) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      const data = getInitialData();
      data.users = updatedUsers;
      saveData(data);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page users-page">
      <h1>Foydalanuvchilar Boshqaruvi</h1>
      <p className="page-subtitle">Barcha ro'yxatdan o'tgan o'quvchilar va foydalanuvchilar</p>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNew}>
          ➕ Yangi Foydalanuvchi Qo'shish
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Qidirish (ismi yoki emaili)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">Barcha holatlari</option>
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ism</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Darajasi</th>
              <th>Holati</th>
              <th>Ro'yxatdan o'tish</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.courseLevel}</td>
                  <td>
                    <span className={`status status-${user.status}`}>
                      {user.status === 'active' ? '✓ Faol' : '⊘ Faol emas'}
                    </span>
                  </td>
                  <td>{new Date(user.registeredDate).toLocaleDateString('uz-UZ')}</td>
                  <td className="action-buttons">
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(user)}>
                      ✏️
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(user.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>Foydalanuvchilar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Foydalanuvchini Tahrirlash' : 'Yangi Foydalanuvchi Qo\'shish'}</h2>
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
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
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
                <label>Darajasi</label>
                <select name="courseLevel" value={formData.courseLevel} onChange={handleInputChange}>
                  <option>A1</option>
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                  <option>C2</option>
                </select>
              </div>

              <div className="form-group">
                <label>Holati</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Faol</option>
                  <option value="inactive">Faol emas</option>
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

export default UserManager;
