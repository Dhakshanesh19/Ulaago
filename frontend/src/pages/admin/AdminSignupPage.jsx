import React, { useState } from 'react';
import axios from 'axios';

const AdminSignupPage = () => {
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
    data.append('role', 'admin'); // important: add role explicitly
    if (formData.idProof) {
      data.append('idProof', formData.idProof);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // if cookie-based auth
      });

      alert('✅ Admin signed up successfully');
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="file"
          name="idProof"
          onChange={handleFileChange}
          accept="image/*,.pdf"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignupPage;
