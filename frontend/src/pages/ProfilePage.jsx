import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PackagePage from './PackagePage'; // ✅ Adjust path as needed

const ProfilePage = ({ user }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
        setLoggedInUser(res.data.user);
      } catch (err) {
        console.error('User not authenticated');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [user, navigate]);

  if (loading) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      {loggedInUser ? (
        <>
          {/* Show name/email only if NOT in browse tab */}
          {tab !== 'browse' && (
            <div className="profile-info">
              <p className="profile-name"><strong>Name:</strong> {loggedInUser.name}</p>
              <p className="profile-email"><strong>Email:</strong> {loggedInUser.email}</p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="profile-tabs">
            <Link to="/profile?tab=overview" className="profile-tab">Overview</Link>
            <Link to="/profile?tab=browse" className="profile-tab">Browse</Link>
            <Link to="/profile?tab=mybookings" className="profile-tab">My Bookings</Link>
          </div>

          {/* Tab Content */}
          <div className="profile-tab-content">
            {tab === 'overview' && (
              <div className="profile-overview">
                <p>Welcome to your profile dashboard.</p>
              </div>
            )}

            {tab === 'browse' && (
              <div className="profile-browse">
                <h3>Explore Packages</h3>
                <PackagePage />
              </div>
            )}

            {tab === 'mybookings' && (
              <div className="profile-bookings">
                <h3>My Bookings</h3>
                <p>This section will show your booked packages.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="profile-login-warning">You must be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
