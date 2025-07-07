import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PackagePage from './pages/PackagePage';
import ProfilePage from './pages/ProfilePage';
import CreatePackagePage from './pages/CreatePackagePage';

// 🔑 Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminSignupPage from './pages/admin/AdminSignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApproveBookings from './pages/admin/ApproveBookings';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage user={user} onLogout={() => setUser(null)} />} />
        <Route path="/package" element={<PackagePage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/create-package" element={<CreatePackagePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={setUser} />} />
        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard user={user} />} />
        <Route path="/admin/approve-bookings" element={<ApproveBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
