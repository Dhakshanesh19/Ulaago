import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminSignupPage.css';

const AdminSignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, idProof: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', 'admin');
    if (formData.idProof) {
      data.append('idProof', formData.idProof);
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/admin/signup`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      alert('✅ Admin signed up successfully');
      navigate('/admin/login');
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="admin-signup-page" id="admin-signup-page">
      <h2 className="admin-signup-title">Admin Signup</h2>
      <form
        className="admin-signup-form"
        id="admin-signup-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="admin-name" className="admin-signup-label">Name</label>
        <input
          id="admin-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="admin-signup-input"
          required
        />

        <label htmlFor="admin-email" className="admin-signup-label">Email</label>
        <input
          id="admin-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="admin-signup-input"
          required
        />

        <label htmlFor="admin-password" className="admin-signup-label">Password</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="admin-signup-input"
          required
        />

        <label htmlFor="admin-idProof" className="admin-signup-label">ID Proof</label>
        <input
          id="admin-idProof"
          type="file"
          name="idProof"
          onChange={handleFileChange}
          className="admin-signup-input"
          accept="image/*,.pdf"
          required
        />

        <button type="submit" className="admin-signup-button">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignupPage;
