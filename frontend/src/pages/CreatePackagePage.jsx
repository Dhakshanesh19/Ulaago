import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreatePackagePage.css';

const CreatePackagePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    packageName: '',
    location: '',
    price: '',
    duration: '',
    description: '',
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:5000/api/packages/create', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to create package');

      alert('✅ Package created successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.message || 'Error creating package');
    }
  };

  return (
    <div className="create-package-container" id="createPackagePage">
      <h2 className="create-package-title">📦 Create New Travel Package</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create-package-form"
        id="createPackageForm"
      >
        <input
          type="text"
          name="packageName"
          placeholder="Package Name"
          value={form.packageName}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (in ₹)"
          value={form.price}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 3 Days / 2 Nights)"
          value={form.duration}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Package Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
          className="form-textarea"
        ></textarea>

        <label className="form-label">Cover Image</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">
          ✅ Create Package
        </button>
      </form>
    </div>
  );
};

export default CreatePackagePage;
