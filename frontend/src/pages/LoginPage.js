import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; // ✅ CSS path relative to src/components or src/pages

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/home';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
          role: 'user',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Login successful');
        onLogin(data.user);
        navigate(redirectPath);
      } else {
        alert(data.msg || 'Login failed');
        console.warn('Login response:', data);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Server error during login');
    }
  };

  return (
    <div className="lp-page" id="lp-user-login-page">
      <h2 className="lp-title">Login to Continue</h2>
      <form className="lp-form" id="lp-user-login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="lp-label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="lp-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="lp-label">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="lp-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="lp-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
