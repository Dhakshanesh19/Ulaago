import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/SignupPage.css'; // ✅ Adjust path if needed

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.msg || 'Signup failed');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <div className="sp-page" id="sp-user-signup-page">
      <h2 className="sp-title">User Signup</h2>
      <form className="sp-form" id="sp-user-signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="sp-label">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="sp-input"
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="sp-label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="sp-input"
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="sp-label">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="sp-input"
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword" className="sp-label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="sp-input"
          onChange={handleChange}
          required
        />

        <button type="submit" className="sp-button">Signup</button>
      </form>

      <p className="sp-login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
