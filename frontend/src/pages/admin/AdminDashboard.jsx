import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import axios from 'axios';
import '../../css/AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCompletedCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/bookings/completed-count`, {
          withCredentials: true,
        });
        setCompletedCount(res.data.completedTrips || 0);
      } catch (err) {
        console.error('Failed to fetch completed trip count', err);
      }
    };

    fetchCompletedCount();
  }, [API_BASE]);

  return (
    <div id="admin-dashboard-page">
      <AdminNavbar user={user} />
      <div className="admin-dashboard-container">
        <h1 className="admin-dashboard-heading">🏁 Admin Dashboard</h1>

        <div className="admin-dashboard-card stats-card">
          <h2>✅ Trips Completed</h2>
          <p className="completed-count">{completedCount}</p>
        </div>

        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card" onClick={() => navigate('/admin/approve-bookings')}>
            <h3>📝 Booking Requests</h3>
            <p>Approve or reject user bookings</p>
          </div>

          <div className="admin-dashboard-card" onClick={() => navigate('/create-package')}>
            <h3>📦 Create Package</h3>
            <p>Add new travel packages to Ulaago</p>
          </div>

          <div className="admin-dashboard-card" onClick={() => navigate('/admin/history')}>
            <h3>📜 Booking History</h3>
            <p>View all past approved/rejected bookings</p>
          </div>

          <div className="admin-dashboard-card" onClick={() => navigate('/admin/active-bookings')}>
            <h3>🔄 Active Bookings</h3>
            <p>View bookings not yet marked completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
