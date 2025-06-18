import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Corrected import paths assuming ALL these components are located within the 'components' folder
// (e.g., src/components/LandingPage.js, src/components/LoginPage.js, etc.)
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CreatePackagePage from './components/CreatePackagePage';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  // Handles user login, setting login status and user type in state and local storage
  const handleLogin = (type) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', type);
    setUserType(type);
    setIsLoggedIn(true);
  };

  // Checks for existing login status and user type in local storage on component mount
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');

    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  // Handles user logout, clearing login status and user type from state and local storage
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType('');
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page - Accessible to everyone */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page - Redirects based on user type after successful login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              // If already logged in, navigate based on user type
              userType === 'admin' ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              // If not logged in, show the Login Page
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Home Page - Protected, accessible only to non-admin logged-in users */}
        <Route
          path="/home"
          element={
            isLoggedIn && userType !== 'admin' ? (
              <HomePage userType={userType} />
            ) : (
              // Redirect to login if not logged in or if user is an admin
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Create Package Page - Protected, accessible only to admin logged-in users */}
        <Route
          path="/create-package"
          element={
            isLoggedIn && userType === 'admin' ? (
              <CreatePackagePage />
            ) : (
              // Redirect to login if not logged in or not an admin
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Dashboard Page - Protected, accessible only to admin logged-in users */}
        <Route
          path="/admin-dashboard"
          element={
            isLoggedIn && userType === 'admin' ? (
              <AdminDashboard />
            ) : (
              // Redirect to login if not logged in or not an admin
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route for any unmatched paths, redirects to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
