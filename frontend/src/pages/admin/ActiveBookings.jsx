import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/ActiveBookings.css'; // ✅ import CSS

const ActiveBookings = () => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActive = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/approved-active', {
        withCredentials: true,
      });
      setActiveBookings(res.data);
    } catch (err) {
      console.error('❌ Failed to load active bookings', err);
      alert('⚠️ Failed to fetch active bookings. Make sure you are logged in as admin.');
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/complete/${bookingId}`, {}, {
        withCredentials: true,
      });
      alert('✅ Booking marked as completed!');
      fetchActive();
    } catch (err) {
      console.error('❌ Failed to mark completed:', err);
      alert('⚠️ Marking as completed failed.');
    }
  };

  useEffect(() => {
    fetchActive();
  }, []);

  if (loading) return <p className="active-loading">Loading active bookings...</p>;

  return (
    <div className="active-bookings-container" id="activeBookingsPage">
      <h2 className="active-bookings-title">✅ Approved Bookings (Not Yet Completed)</h2>

      {activeBookings.length === 0 ? (
        <p className="active-empty">No active bookings pending completion.</p>
      ) : (
        activeBookings.map((b) => (
          <div className="active-booking-card" key={b._id}>
            <p><strong>User:</strong> {b.user?.name} ({b.user?.email})</p>
            <p><strong>Package:</strong> {b.package?.packageName} - {b.package?.location}</p>
            <p><strong>Booked On:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>

            <button className="active-complete-btn" onClick={() => markCompleted(b._id)}>
              ✅ Mark as Completed
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveBookings;
