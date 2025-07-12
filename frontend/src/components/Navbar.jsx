import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        onLogout();
        navigate('/');
      } else {
        alert('Failed to logout. Try again.');
      }
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Failed to logout');
    }
  };

  const hideOnRoutes = ['/admin/login', '/admin/signup'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const isAdmin = user?.role === 'admin';
  const homeLink = isAdmin ? '/admin/dashboard' : '/home';
  const profileLink = isAdmin ? '/admin/dashboard' : '/profile?tab=overview';

  return (
    <nav id="navbar" className="nb-navbar">
      <div className="nb-left">
        <Link to={homeLink} className="nb-logo">🌍 Ulaago</Link>
        <Link to={homeLink} className="nb-link">Home</Link>
        {!isAdmin && <Link to="/contact" className="nb-link">Contact Us</Link>}
      </div>

      <div className="nb-right">
        {!user ? (
          <>
            <Link to="/login" className="nb-button">Login</Link>
            <Link to="/signup" className="nb-button">Signup</Link>
          </>
        ) : (
          <>
            <Link to={profileLink} className="nb-button">My Profile</Link>
            <button onClick={handleLogout} className="nb-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
