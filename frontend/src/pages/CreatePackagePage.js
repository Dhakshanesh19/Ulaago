import React, { useState } from 'react';
import './CreatePackagePage.css';

const CreatePackagePage = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    location: '',
    duration: '',
    price: '',
    coverImage: null,
    description: '',
    dates: '',
    vlogLink: '',
    facilities: {
      Hotel: false,
      Guide: false,
      Food: false,
      Activities: false,
      BikeRental: false,
    },
    contactName: '',
    contactNumber: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setImagePreview(URL.createObjectURL(file));
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        facilities: { ...formData.facilities, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('packageName', formData.packageName);
    form.append('location', formData.location);
    form.append('duration', formData.duration);
    form.append('price', formData.price);
    form.append('coverImage', formData.coverImage);
    form.append('description', formData.description);
    form.append('dates', formData.dates);
    form.append('vlogLink', formData.vlogLink);
    form.append('contactName', formData.contactName);
    form.append('contactNumber', formData.contactNumber);
    form.append('facilities', JSON.stringify(formData.facilities));

    try {
      const res = await fetch('http://localhost:5000/api/packages', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      if (res.ok) {
        alert('✅ Package created successfully!');
        window.location.href = '/home'; // Navigate to homepage
      } else {
        alert('❌ Failed to create package: ' + result.message);
      }
    } catch (error) {
      alert('🚫 Server error: ' + error.message);
    }
  };

  const handleClear = () => {
    setFormData({
      packageName: '',
      location: '',
      duration: '',
      price: '',
      coverImage: null,
      description: '',
      dates: '',
      vlogLink: '',
      facilities: {
        Hotel: false,
        Guide: false,
        Food: false,
        Activities: false,
        BikeRental: false,
      },
      contactName: '',
      contactNumber: '',
    });
    setImagePreview(null);
  };

  return (
    <div className="package-page">
      <header className="navbar">
        <div className="logo">Ulaago</div>
        <div className="user-info">
          <span>Welcome, Praveen</span>
          <img
            src="https://i.pravatar.cc/40?u=praveen"
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </header>

      <div className="package-form-container">
        <h2>Create a Travel Package</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="packageName"
            placeholder="Package Name"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location/City"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3 Days / 2 Nights)"
            value={formData.duration}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (in ₹)"
            value={formData.price}
            onChange={handleChange}
          />

          <label>Upload Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" width="200" />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Short Description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label>Available Dates:</label>
          <input
            type="date"
            name="dates"
            value={formData.dates}
            onChange={handleChange}
          />

          <input
            type="text"
            name="vlogLink"
            placeholder="Route Map / Vlog Link"
            value={formData.vlogLink}
            onChange={handleChange}
          />

          <div className="facility-checklist">
            <label>Facilities Included:</label>
            <div className="facility-checklist-container">
              {Object.keys(formData.facilities).map((item) => (
                <div className="facility-item" key={item}>
                  <input
                    type="checkbox"
                    name={item}
                    id={item}
                    checked={formData.facilities[item]}
                    onChange={handleChange}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>

          <input
            type="text"
            name="contactName"
            placeholder="Contact Person Name"
            value={formData.contactName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit">✅ Create Package</button>
            <button type="button" onClick={handleClear}>
              🔄 Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackagePage;
