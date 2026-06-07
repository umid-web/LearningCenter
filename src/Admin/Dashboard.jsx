// src/Admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getInitialData } from '../utils/auth';
import './admin.scss';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const adminData = getInitialData();
    setData(adminData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="admin-page dashboard"><p>Yuklanmoqda...</p></div>;
  }

  if (!data) {
    return <div className="admin-page dashboard"><p>Ma'lumotlarni yuklashda xato</p></div>;
  }

  const newRegistrations = data.registrations.filter(r => r.status === 'pending').length;
  const activeStudents = data.users.filter(u => u.status === 'active').length;

  return (
    <div className="admin-page dashboard">
      <h1>Administrator Dashboard</h1>
      <p className="dashboard-subtitle">Tizim holati va statistika</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <p className="stat-label">Jami Kurslar</p>
            <p className="stat-value">{data.courses.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <p className="stat-label">O'qituvchilar</p>
            <p className="stat-value">{data.teachers.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Foydalanuvchilar</p>
            <p className="stat-value">{data.users.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <p className="stat-label">Faol Talabalar</p>
            <p className="stat-value">{activeStudents}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <p className="stat-label">Yangi Ro'yxatlar</p>
            <p className="stat-value highlight">{newRegistrations}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Umumiy Daromad</p>
            <p className="stat-value">{data.courses.reduce((sum, c) => sum + parseInt(c.price), 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>So'nggi Ro'yxatlanishlar</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>O'quvchi nomi</th>
                  <th>Kurs</th>
                  <th>Sana</th>
                  <th>Holat</th>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                {data.registrations.slice(0, 5).map(reg => (
                  <tr key={reg.id}>
                    <td>{reg.userName}</td>
                    <td>{reg.course}</td>
                    <td>{new Date(reg.registeredDate).toLocaleDateString('uz-UZ')}</td>
                    <td>
                      <span className={`status status-${reg.status}`}>
                        {reg.status === 'pending' ? '⏳ Kutilmoqda' : '✓ Tasdiqlandi'}
                      </span>
                    </td>
                    <td>{reg.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>Eng Ko'p Aralashuv Oladigan Kurslar</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kurs nomi</th>
                  <th>Darajasi</th>
                  <th>Talabalar</th>
                  <th>O'qituvchi</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {data.courses.sort((a, b) => b.students - a.students).map(course => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.level}</td>
                    <td>{course.students} ta</td>
                    <td>{course.teacher}</td>
                    <td>
                      <span className="status status-active">
                        ✓ Faol
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
