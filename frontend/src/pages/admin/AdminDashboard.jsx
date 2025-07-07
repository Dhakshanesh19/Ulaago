import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

import { useEffect } from 'react';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      <AdminNavbar user={user} />
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/admin/approve-bookings')}>Manage Booking Requests</button>
      <button onClick={() => navigate('/create-package')}>Create Package</button>
    </div>
  );
};

export default AdminDashboard;
