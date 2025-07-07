import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/pending', {
        withCredentials: true, // ✅ This is the line you asked about
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch pending bookings:', err);
      alert('⚠️ You must be logged in as an admin to view this page.');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Pending Bookings</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p><strong>User:</strong> {b.user.name} ({b.user.email})</p>
            <p><strong>Package:</strong> {b.package.packageName} - {b.package.location}</p>
            <p><strong>Booking Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleDecision(b._id, 'approved')} style={{ marginRight: '1rem', backgroundColor: '#4CAF50', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                ✅ Approve
              </button>
              <button onClick={() => handleDecision(b._id, 'rejected')} style={{ backgroundColor: '#f44336', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveBookings;
