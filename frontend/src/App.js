import React, { useState, useEffect } from 'react'; // ← add useEffect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CreatePackagePage from './pages/CreatePackagePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

 const handleLogin = (type) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userType', type);
  setUserType(type);
  setIsLoggedIn(true);
};
useEffect(() => {
  const storedLogin = localStorage.getItem('isLoggedIn');
  const storedUserType = localStorage.getItem('userType');

  if (storedLogin === 'true') {
    setIsLoggedIn(true);
    setUserType(storedUserType);
  }
}, []);
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  setIsLoggedIn(false);
  setUserType('');
};


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomePage userType={userType} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/create-package"
          element={
            isLoggedIn ? (
              <CreatePackagePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;











