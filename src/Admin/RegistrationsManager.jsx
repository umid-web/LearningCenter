// src/Admin/RegistrationsManager.jsx
import { useState, useEffect } from 'react';
import { getInitialData, saveData } from '../utils/auth';
import './admin.scss';

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    setLoading(true);
    const data = getInitialData();
    setRegistrations(data.registrations);
    setLoading(false);
  };

  const updateStatus = (id, newStatus) => {
    const updatedRegistrations = registrations.map(reg =>
      reg.id === id ? { ...reg, status: newStatus } : reg
    );
    setRegistrations(updatedRegistrations);
    const data = getInitialData();
    data.registrations = updatedRegistrations;
    saveData(data);
  };

  const deleteRegistration = (id) => {
    if (window.confirm('Bu ro\'yxatlanishni o\'chirib tashlamoqchisiz?')) {
      const updatedRegistrations = registrations.filter(reg => reg.id !== id);
      setRegistrations(updatedRegistrations);
      const data = getInitialData();
      data.registrations = updatedRegistrations;
      saveData(data);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length
  };

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page registrations-page">
      <h1>Ro'yxatlanishlar Boshqaruvi</h1>
      <p className="page-subtitle">Yangi kursga ro'yxatlanish so'rovlari</p>

      <div className="stats-row">
        <div className="stat-mini">
          <p className="stat-label">Jami So'rovlar</p>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-mini pending">
          <p className="stat-label">Kutilmoqdagi</p>
          <p className="stat-value">{stats.pending}</p>
        </div>
        <div className="stat-mini approved">
          <p className="stat-label">Tasdiqlandi</p>
          <p className="stat-value">{stats.approved}</p>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Qidirish (o'quvchi nomi yoki kurs)..."
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
          <option value="pending">Kutilmoqda</option>
          <option value="approved">Tasdiqlandi</option>
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>O'quvchi nomi</th>
              <th>Kurs</th>
              <th>Telefon</th>
              <th>Ro'yxatdan o'tish sanasi</th>
              <th>Holati</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map(reg => (
                <tr key={reg.id}>
                  <td>{reg.userName}</td>
                  <td>{reg.course}</td>
                  <td>{reg.phone}</td>
                  <td>{new Date(reg.registeredDate).toLocaleDateString('uz-UZ')}</td>
                  <td>
                    <span className={`status status-${reg.status}`}>
                      {reg.status === 'pending' ? '⏳ Kutilmoqda' : '✓ Tasdiqlandi'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    {reg.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-sm btn-approve"
                          onClick={() => updateStatus(reg.id, 'approved')}
                          title="Tasdiqlash"
                        >
                          ✓
                        </button>
                        <button
                          className="btn btn-sm btn-reject"
                          onClick={() => updateStatus(reg.id, 'rejected')}
                          title="Rad etish"
                        >
                          ✕
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => deleteRegistration(reg.id)}
                      title="O'chirish"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Ro'yxatlanishlar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsManager;
