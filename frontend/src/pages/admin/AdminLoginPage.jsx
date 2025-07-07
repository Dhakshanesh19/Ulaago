import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIRST login request to get cookie/token
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true } // important for sending cookie
      );

      if (res.data.user.role !== 'admin') {
        return alert('Access denied');
      }

      // ✅ Optionally test protected route after login (not required here)
      // await axios.get('http://localhost:5000/api/bookings/pending', { withCredentials: true });

      onLogin(res.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
