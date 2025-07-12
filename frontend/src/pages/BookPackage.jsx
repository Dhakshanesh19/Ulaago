import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/BookPackagePage.css'; // scoped CSS

const API = process.env.REACT_APP_API_URL;

const BookPackagePage = ({ user, onLogin }) => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    paymentType: '',
    numDays: '',
    mobileNumber: '',
    idProof: null,
    personalPhoto: null,
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${API}/api/packages/${packageId}`);
        if (!res.ok) throw new Error('Failed to fetch package');
        const data = await res.json();
        setPkg(data);
      } catch {
        alert('Failed to load package');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  useEffect(() => {
    if (!user) {
      fetch(`${API}/api/auth/me`, { credentials: 'include' })
        .then((res) => {
          if (!res.ok) throw new Error('Not logged in');
          return res.json();
        })
        .then((data) => onLogin(data.user))
        .catch(() => navigate(`/login?redirect=/book/${packageId}`));
    }
  }, [user, packageId, navigate, onLogin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBooking = async () => {
    const formData = new FormData();
    formData.append('packageId', packageId);
    formData.append('paymentType', form.paymentType.trim());
    formData.append('numDays', form.numDays);
    formData.append('mobileNumber', form.mobileNumber.trim());
    formData.append('idProof', form.idProof);
    formData.append('personalPhoto', form.personalPhoto);

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Booking failed');

      alert('🎉 Booking Successful!');
      navigate('/profile?tab=mybookings');
    } catch (err) {
      console.error('❌ Booking error:', err);
      alert(err.message || 'Booking failed');
    }
  };

  if (loading || !pkg) return <p className="bp-loading">Loading...</p>;

  return (
    <div className="bp-container" id="bp-booking-page">
      <div className="bp-card">
        <h2 className="bp-title">Book: {pkg.packageName}</h2>

        <img
          className="bp-image"
          src={`${API}${pkg.coverImageUrl.startsWith('/') ? '' : '/'}${pkg.coverImageUrl}`}
          alt={pkg.packageName}
        />

        <div className="bp-info">
          <p><strong>Location:</strong> {pkg.location}</p>
          <p><strong>Price:</strong> ₹{pkg.price}</p>
          <p><strong>Duration:</strong> {pkg.duration}</p>
        </div>

        <div className="bp-user">
          <h3>Your Details</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <h3 className="bp-form-title">Booking Info</h3>
        <form className="bp-form" onSubmit={(e) => e.preventDefault()}>
          <label>Number of Days</label>
          <input type="number" name="numDays" value={form.numDays} onChange={handleChange} required />

          <label>Mobile Number</label>
          <input type="text" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required />

          <label>Payment Type</label>
          <select name="paymentType" value={form.paymentType} onChange={handleChange} required>
            <option value="">-- Select Payment --</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>

          <label>ID Proof Image</label>
          <input type="file" name="idProof" accept="image/*" onChange={handleChange} required />

          <label>Personal Photo</label>
          <input type="file" name="personalPhoto" accept="image/*" onChange={handleChange} required />

          <button type="submit" className="bp-submit" onClick={handleBooking} disabled={!form.paymentType}>
            🚀 Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookPackagePage;
