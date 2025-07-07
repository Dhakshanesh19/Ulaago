import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ user }) => (
  <nav>
    <Link to="/admin/dashboard">Dashboard</Link>
    <Link to="/create-package">Create Package</Link>
    <Link to="/admin/approve-bookings">Approve Bookings</Link>
    {user && <span>Welcome, {user.name}</span>}
  </nav>
);

export default AdminNavbar;
