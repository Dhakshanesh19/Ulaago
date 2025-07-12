import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/ApproveBookings.css'; // ✅ Make sure this path is correct

const ApproveBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/pending`, {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      alert('⚠️ You must be logged in as an admin to view this page.');
    }
  };

  const handleDecision = async (id, action) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/bookings/${action}/${id}`;
      await axios.put(url, {}, { withCredentials: true });
      alert(`Booking ${action}d successfully.`);
      fetchPending();
    } catch (err) {
      console.error(`Error ${action}ing booking:`, err);
      alert('Action failed.');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div id="approve-bookings-page">
      <h2 className="approve-heading">📝 Pending Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings available to manage.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <div className="booking-info">
              <p><strong>User:</strong> {b.user.name} ({b.user.email})</p>
              <p><strong>Package:</strong> {b.package.packageName} - {b.package.location}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Booking Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>
              <p><strong>Days:</strong> {b.numDays}</p>
              <p><strong>Mobile:</strong> {b.mobileNumber}</p>
            </div>

            <div className="booking-images">
              <div>
                <p><strong>ID Proof:</strong></p>
                {b.idProof && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${b.idProof}`}
                    alt="ID Proof"
                    className="preview-image"
                  />
                )}
              </div>
              <div>
                <p><strong>Personal Photo:</strong></p>
                {b.personalPhoto && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${b.personalPhoto}`}
                    alt="Personal"
                    className="preview-image"
                  />
                )}
              </div>
            </div>

            <div className="booking-actions">
              <button
                className="approve-btn"
                onClick={() => handleDecision(b._id, 'approve')}
              >
                ✅ Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => handleDecision(b._id, 'reject')}
              >
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
