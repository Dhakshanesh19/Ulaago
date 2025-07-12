import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminLoginPage.css';

const AdminLoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email: email.trim(),
          password: password.trim(),
          role: 'admin',
        },
        { withCredentials: true }
      );

      const user = res.data.user;

      if (user.role !== 'admin') {
        return alert('❌ Access denied: not an admin');
      }

      onLogin(user);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin Login Error:', err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container" id="admin-login-page">
      <div className="admin-login-box">
        <h2 className="admin-login-title">🔐 Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form" id="admin-login-form">
          <label htmlFor="admin-email" className="admin-login-label">Email</label>
          <input
            id="admin-email"
            type="email"
            name="email"
            className="admin-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="admin-password" className="admin-login-label">Password</label>
          <input
            id="admin-password"
            type="password"
            name="password"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
