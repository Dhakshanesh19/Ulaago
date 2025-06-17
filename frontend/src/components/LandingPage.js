import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import videoBg from '../assets/vedio.mp4'; // Make sure this is 720x1080

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <nav className="navbar">
        <div className="logo">Ulaago</div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')}>Login</button>
          <button className="signup" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <div className="video-container">
        <video autoPlay muted loop className="video-bg">
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="content">
          <button className="cta-btn">Start Your Journey</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


