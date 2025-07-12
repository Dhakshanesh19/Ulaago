import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminNavbar.css';

const AdminNavbar = ({ user }) => (
  <nav id="admin-navbar" className="admin-navbar">
    <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
    <Link to="/create-package" className="admin-nav-link">Create Package</Link>
    <Link to="/admin/approve-bookings" className="admin-nav-link">Approve Bookings</Link>
    <Link to="/admin/active-bookings" className="admin-nav-link">Active Bookings</Link>
    <Link to="/admin/history" className="admin-nav-link">Booking History</Link>
    
    {user && (
      <span id="admin-welcome" className="admin-welcome-text">
        Welcome, {user.name}
      </span>
    )}
  </nav>
);

export default AdminNavbar;
