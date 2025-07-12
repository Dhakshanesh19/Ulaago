import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PackagePage from './PackagePage';
import '../css/ProfilePage.css';

const ProfilePage = ({ user }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
        setLoggedInUser(res.data.user);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/bookings/my', {
        credentials: 'include',
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  };

  useEffect(() => {
    if (tab === 'mybookings') {
      fetchBookings();
    }
  }, [tab]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Booking deleted');
        fetchBookings();
      } else {
        alert('Failed to delete booking');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (id) => {
    const numDays = prompt('Enter new number of days:');
    const mobileNumber = prompt('Enter new mobile number:');
    const paymentType = prompt('Enter new payment type (UPI/Card/Cash):');

    if (!numDays || !mobileNumber || !paymentType) {
      return alert('All fields are required');
    }

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ numDays, mobileNumber, paymentType }),
      });
      if (res.ok) {
        alert('Booking updated');
        fetchBookings();
      } else {
        const data = await res.json();
        alert(`Failed to update: ${data.msg}`);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (loading) return <p className="pp-loading">Loading profile...</p>;

  return (
    <div className="pp-container" id="profile-page">
      <h2 className="pp-title">User Profile</h2>

      {loggedInUser ? (
        <>
          <div className="pp-user-info">
            <p><strong>Name:</strong> {loggedInUser.name}</p>
            <p><strong>Email:</strong> {loggedInUser.email}</p>
          </div>

          <div className="pp-tabs">
            <Link to="/profile?tab=overview" className={tab === 'overview' ? 'active' : ''}>Overview</Link>
            <Link to="/profile?tab=browse" className={tab === 'browse' ? 'active' : ''}>Browse</Link>
            <Link to="/profile?tab=mybookings" className={tab === 'mybookings' ? 'active' : ''}>My Bookings</Link>
          </div>

          <div className="pp-content">
            {tab === 'overview' && (
              <div className="pp-tab-overview">
                <p>Welcome to your profile dashboard. Use the tabs above to navigate.</p>
              </div>
            )}

            {tab === 'browse' && (
              <div className="pp-tab-browse">
                <h3>Explore Packages</h3>
                <PackagePage />
              </div>
            )}

            {tab === 'mybookings' && (
              <div className="pp-tab-bookings">
                <h3>My Bookings</h3>
                {bookings.length === 0 ? (
                  <p>You have not booked any packages yet.</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking._id} className="pp-booking-card">
                      <h4>{booking.package?.packageName || 'Package Deleted'}</h4>
                      <p><strong>Location:</strong> {booking.package?.location || 'N/A'}</p>
                      <p><strong>Price:</strong> ₹{booking.package?.price || 'N/A'}</p>
                      <p><strong>Status:</strong> {booking.status}</p>
                      <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      <p><strong>Payment Type:</strong> {booking.paymentType}</p>
                      <p><strong>Days:</strong> {booking.numDays}</p>
                      <p><strong>Mobile:</strong> {booking.mobileNumber}</p>

                      <div className="pp-booking-actions">
                        <button onClick={() => handleDelete(booking._id)} className="delete-btn">Delete</button>
                        <button onClick={() => handleUpdate(booking._id)} className="update-btn">Update</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <p>You must be logged in to view this page.</p>
      )}
    </div>
  );
};

export default ProfilePage;
