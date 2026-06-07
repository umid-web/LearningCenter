import { useState, useEffect } from 'react';
import { getRegistrations, updateRegistration, deleteRegistration, addRegistration } from '../utils/dbApi';
import './admin.scss';

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReg, setSelectedReg] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    course: '',
    message: ''
  });

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    setLoading(true);
    setRegistrations(getRegistrations());
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
    setFormData({
      userName: '',
      userEmail: '',
      userPhone: '',
      course: '',
      message: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.userName || !formData.userEmail || !formData.course) {
      alert('Barcha majburiy maydonlarni to\'ldiring!');
      return;
    }

    try {
      addRegistration(formData);
      loadRegistrations();
      setShowModal(false);
      alert('Ro\'yxatlanish qo\'shildi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const handleApprove = (id) => {
    if (window.confirm('Bu ro\'yxatlanishni tasdiqlash qalaysiz?')) {
      try {
        updateRegistration(id, { status: 'approved' });
        loadRegistrations();
        alert('Ro\'yxatlanish tasdiqlandi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Bu ro\'yxatlanishni rad etish qalaysiz?')) {
      try {
        updateRegistration(id, { status: 'rejected' });
        loadRegistrations();
        alert('Ro\'yxatlanish rad etildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const handleSendReply = (id, email) => {
    if (!replyMessage.trim()) {
      alert('Javob xabarini kiriting!');
      return;
    }

    // In a real application, you would send this email here
    alert(`Javob ${email} ga yuborildi!`);
    setReplyMessage('');
    setSelectedReg(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu ro\'yxatlanishni o\'chirib tashlamoqchisiz?')) {
      try {
        deleteRegistration(id);
        loadRegistrations();
        alert('Ro\'yxatlanish o\'chirildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length
  };

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page registrations-page">
      <h1>Ro'yxatlanishlar Boshqaruvi</h1>
      <p className="page-subtitle">Kursga yozilganlarning barcha arizalarini boshqarish</p>

      <div className="stats-row">
        <div className="stat-mini">
          <div className="stat-label">Jami</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-mini pending">
          <div className="stat-label">Kutilmoqda</div>
          <div className="stat-value">{stats.pending}</div>
        </div>
        <div className="stat-mini approved">
          <div className="stat-label">Tasdiqlandi</div>
          <div className="stat-value">{stats.approved}</div>
        </div>
        <div className="stat-mini">
          <div className="stat-label">Rad etildi</div>
          <div className="stat-value">{stats.rejected}</div>
        </div>
      </div>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Yangi Ro'yxatlanish Qo'shish
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Qidirish (ism, email yoki kurs)..."
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
          <option value="rejected">Rad etildi</option>
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>O'quvchi Ismi</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Kurs</th>
              <th>Sana</th>
              <th>Holati</th>
              <th>Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map(reg => (
                <tr key={reg.id}>
                  <td>
                    <button
                      style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline'}}
                      onClick={() => setSelectedReg(reg)}
                    >
                      {reg.userName}
                    </button>
                  </td>
                  <td>{reg.userEmail}</td>
                  <td>{reg.userPhone}</td>
                  <td>{reg.course}</td>
                  <td>{new Date(reg.createdAt).toLocaleDateString('uz-UZ')}</td>
                  <td>
                    <span className={`status status-${reg.status}`}>
                      {reg.status === 'pending' ? '⏳ Kutilmoqda' : 
                       reg.status === 'approved' ? '✓ Tasdiqlandi' : 
                       '✕ Rad etildi'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    {reg.status === 'pending' && (
                      <>
                        <button className="btn btn-sm btn-approve" onClick={() => handleApprove(reg.id)} title="Tasdiqlash">
                          ✓
                        </button>
                        <button className="btn btn-sm btn-reject" onClick={() => handleReject(reg.id)} title="Rad etish">
                          ✕
                        </button>
                      </>
                    )}
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(reg.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>Ro'yxatlanishlar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedReg && (
        <div className="modal-overlay" onClick={() => setSelectedReg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ro'yxatlanish Batafsillari</h2>
              <button className="modal-close" onClick={() => setSelectedReg(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="registration-details">
                <div className="detail-row">
                  <strong>O'quvchi Ismi:</strong>
                  <span>{selectedReg.userName}</span>
                </div>
                <div className="detail-row">
                  <strong>Email:</strong>
                  <span>{selectedReg.userEmail}</span>
                </div>
                <div className="detail-row">
                  <strong>Telefon:</strong>
                  <span>{selectedReg.userPhone}</span>
                </div>
                <div className="detail-row">
                  <strong>Kurs:</strong>
                  <span>{selectedReg.course}</span>
                </div>
                <div className="detail-row">
                  <strong>Sana:</strong>
                  <span>{new Date(selectedReg.createdAt).toLocaleString('uz-UZ')}</span>
                </div>
                <div className="detail-row">
                  <strong>Holati:</strong>
                  <span>
                    <span className={`status status-${selectedReg.status}`}>
                      {selectedReg.status === 'pending' ? '⏳ Kutilmoqda' : 
                       selectedReg.status === 'approved' ? '✓ Tasdiqlandi' : 
                       '✕ Rad etildi'}
                    </span>
                  </span>
                </div>
                {selectedReg.message && (
                  <div className="detail-row">
                    <strong>Xabar:</strong>
                    <p style={{margin: '0.5rem 0', lineHeight: '1.5'}}>{selectedReg.message}</p>
                  </div>
                )}
              </div>

              <div style={{marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem'}}>
                <h3>Javob Yuborish</h3>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="O'quvchiga javob xabarini kiriting..."
                  rows="4"
                  style={{width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#e0e0e0'}}
                />
              </div>
            </div>

            <div className="modal-footer">
              {selectedReg.status === 'pending' && (
                <>
                  <button className="btn btn-approve" onClick={() => {
                    handleApprove(selectedReg.id);
                    setSelectedReg(null);
                  }}>
                    ✓ Tasdiqlash
                  </button>
                  <button className="btn btn-reject" onClick={() => {
                    handleReject(selectedReg.id);
                    setSelectedReg(null);
                  }}>
                    ✕ Rad Etish
                  </button>
                </>
              )}
              {replyMessage && (
                <button className="btn btn-primary" onClick={() => handleSendReply(selectedReg.id, selectedReg.userEmail)}>
                  Javob Yuborish
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setSelectedReg(null)}>
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Yangi Ro'yxatlanish Qo'shish</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>O'quvchi Ismi *</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="To'liq ismi"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Telefon *</label>
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  placeholder="+998 XX XXX XX XX"
                />
              </div>

              <div className="form-group">
                <label>Kurs *</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="Kurs nomini kiriting"
                />
              </div>

              <div className="form-group">
                <label>Xabar</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="O'quvchining xabari"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Bekor qilish
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsManager;
