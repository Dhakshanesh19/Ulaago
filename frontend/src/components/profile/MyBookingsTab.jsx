import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookingsTab = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings?userId=${user?._id}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking._id}>
              <strong>{booking.packageName}</strong> on {booking.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsTab;
