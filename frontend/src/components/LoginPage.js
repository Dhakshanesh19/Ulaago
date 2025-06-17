import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    socialLink: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Simulate login and pass userType to App.js
    onLogin(userType);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-area">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/beach.png" alt="logo" />
          <h1>Ulaago Admin</h1>
        </div>
      </div>

      <div className="right-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />

          <label>User Type</label>
          <select
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="provider">Local Tourist Provider</option>
            <option value="vlogger">Traveler / Moto Vlogger</option>
          </select>

          {userType === 'provider' && (
            <>
              <label>Company Name</label>
              <input type="text" name="company" onChange={handleChange} required />
            </>
          )}

          {userType === 'vlogger' && (
            <>
              <label>Instagram/YouTube Link</label>
              <input type="url" name="socialLink" onChange={handleChange} required />
            </>
          )}

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="wave-divider"></div>
    </div>
  );
};

export default LoginPage;
