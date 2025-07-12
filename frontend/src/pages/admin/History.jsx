import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/History.css'; // ✅ CSS import

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/history`, {
          withCredentials: true,
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load booking history:', err);
      }
    };

    fetchHistory();
  }, []);

  const groupByStatus = (status) => {
    if (status === 'completed') {
      return history.filter((b) => b.status === 'approved' && b.isCompleted);
    }
    return history.filter((b) => b.status === status);
  };

  const renderBookingCard = (b) => (
    <div className="history-card" id={`booking-${b._id}`} key={b._id}>
      <div className="history-info">
        <p><strong>User:</strong> {b.user?.name} ({b.user?.email})</p>
        <p><strong>Package:</strong> {b.package?.packageName} - {b.package?.location}</p>
        <p><strong>Status:</strong> {b.status}{b.isCompleted ? ' (Completed)' : ''}</p>
        <p><strong>Booked On:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>
        <p><strong>Days:</strong> {b.numDays}</p>
        <p><strong>Mobile:</strong> {b.mobileNumber}</p>
      </div>

      <div className="history-images">
        {b.idProof && (
          <div>
            <p><strong>ID Proof:</strong></p>
            <img
              src={`${process.env.REACT_APP_API_URL}/${b.idProof}`}
              alt="ID Proof"
              className="history-img"
            />
          </div>
        )}
        {b.personalPhoto && (
          <div>
            <p><strong>Personal Photo:</strong></p>
            <img
              src={`${process.env.REACT_APP_API_URL}/${b.personalPhoto}`}
              alt="Personal"
              className="history-img"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="history-container" id="admin-history">
      <h2 className="history-title">📜 Booking History</h2>

      <div className="history-section" id="history-approved">
        <h3 className="history-heading">✅ Approved Bookings</h3>
        {groupByStatus('approved').length === 0 ? (
          <p className="history-empty">No approved bookings.</p>
        ) : (
          groupByStatus('approved').map(renderBookingCard)
        )}
      </div>

      <div className="history-section" id="history-rejected">
        <h3 className="history-heading">❌ Rejected Bookings</h3>
        {groupByStatus('rejected').length === 0 ? (
          <p className="history-empty">No rejected bookings.</p>
        ) : (
          groupByStatus('rejected').map(renderBookingCard)
        )}
      </div>

      <div className="history-section" id="history-completed">
        <h3 className="history-heading">✅✅ Completed Trips</h3>
        {groupByStatus('completed').length === 0 ? (
          <p className="history-empty">No trips completed yet.</p>
        ) : (
          groupByStatus('completed').map(renderBookingCard)
        )}
      </div>
    </div>
  );
};

export default History;
