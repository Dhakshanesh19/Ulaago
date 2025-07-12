import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PackagePage from './pages/PackagePage';
import ProfilePage from './pages/ProfilePage';
import CreatePackagePage from './pages/CreatePackagePage';
import BookPackagePage from './pages/BookPackage';
import Navbar from './components/Navbar';

// 🔑 Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminSignupPage from './pages/admin/AdminSignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApproveBookings from './pages/admin/ApproveBookings';
import ActiveBookings from './pages/admin/ActiveBookings';
import History from './pages/admin/History';
function App() {
  const [user, setUser] = useState(null);

  // ✅ Fetch user on initial mount from cookie (persistent login)
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include', // required for cookies
        });
        if (!res.ok) {
          setUser(null); // ensure state cleared
          return;
        }
                const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };

    fetchLoggedInUser();
  }, []);

  // ✅ Logout: clear cookie + state + full reload
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        window.location.href = '/'; // Full reload ensures all components reset
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Network error during logout');
    }
  };

  return (
    <Router>
      {/* ✅ Global Navbar - receives user and logout handler */}
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage user={user} onLogin={setUser} onLogout={handleLogout} />} />
        <Route path="/packages" element={<PackagePage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/create-package" element={<CreatePackagePage />} />
        <Route path="/book/:packageId" element={<BookPackagePage user={user} onLogin={setUser} />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={setUser} />} />
        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard user={user} />} />
        <Route path="/admin/approve-bookings" element={<ApproveBookings />} />
        <Route path="/admin/history" element={<History />} />
        <Route path="/admin/active-bookings" element={<ActiveBookings />} />

      </Routes>
    </Router>
  );
}

export default App;
