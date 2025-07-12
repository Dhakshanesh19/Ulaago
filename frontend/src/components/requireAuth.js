// src/components/RequireAuth.js
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const RequireAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, { withCredentials: true })
      .then(res => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        navigate('/login', { state: { from: location.pathname } });
      });
  }, [location.pathname, navigate]);

  if (loading) return <p>Checking authentication...</p>;
  return authenticated ? children : null;
};

export default RequireAuth;
