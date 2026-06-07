// src/Admin/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import './admin.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(username, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-login-title">O'quv‑Markaz Admin</h1>
          <p className="admin-login-subtitle">Administrator paneli</p>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Foydalanuvchi nomi</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin yoki teacher"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Parol</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </button>
          </form>

          <div className="admin-login-info">
            <p className="info-title">Test hisoblaridan foydalaning:</p>
            <div className="credentials">
              <div>
                <strong>Admin:</strong>
                <p>username: admin</p>
                <p>password: admin123</p>
              </div>
              <div>
                <strong>Teacher:</strong>
                <p>username: teacher</p>
                <p>password: teacher123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
