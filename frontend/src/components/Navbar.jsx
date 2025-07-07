import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo">🌍 Ulaago</Link>
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/contact" className="navbar-link">Contact Us</Link>
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-button">Login</Link>
            <Link to="/signup" className="navbar-button">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/profile?tab=overview" className="navbar-button">My Profile</Link>
            <button onClick={onLogout} className="navbar-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
