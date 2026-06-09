// src/Admin/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  coursesService,
  teachersService,
  studentsService,
} from "./services/crudService.js";

const StatCard = ({ icon, label, value, loading }) => (
  <div className="stat-card">
    <div className="stat-icon" aria-hidden="true">
      {icon}
    </div>
    <div className="stat-info">
      <span className="stat-value">{loading ? "—" : value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ courses: 0, teachers: 0, students: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [courses, teachers, students] = await Promise.all([
          coursesService.getAll(),
          teachersService.getAll(),
          studentsService.getAll(),
        ]);
        if (!active) return;
        setStats({
          courses: courses.length,
          teachers: teachers.length,
          students: students.length,
        });
        setRecent(students.slice(-5).reverse());
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="admin-page">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">O&apos;quv markaz umumiy ko&apos;rsatkichlari</p>
        </div>
      </header>

      {error && <div className="table-state error">Xatolik: {error}</div>}

      <div className="stats-grid">
        <StatCard icon="📚" label="Jami kurslar" value={stats.courses} loading={loading} />
        <StatCard icon="👨‍🏫" label="O'qituvchilar" value={stats.teachers} loading={loading} />
        <StatCard icon="🎓" label="Talabalar" value={stats.students} loading={loading} />
      </div>

      <div className="panel">
        <h2 className="panel-title">So&apos;nggi talabalar</h2>
        {loading ? (
          <div className="table-state" role="status">
            <span className="spinner" aria-hidden="true" /> Yuklanmoqda...
          </div>
        ) : recent.length ? (
          <ul className="recent-list">
            {recent.map((s) => (
              <li key={s.id}>
                <span className="recent-name">{s.name}</span>
                <span className="recent-meta">{s.course || "—"}</span>
                <span className={`status-pill ${s.status === "active" ? "on" : "off"}`}>
                  {s.status === "active" ? "Faol" : "Nofaol"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="table-state">Talabalar topilmadi</div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
