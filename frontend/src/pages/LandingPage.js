import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
  return (
    <div id="landing-page" className="lp-container">
     

      {/* Hero Section */}
      <section className="lp-hero">
        <h2>Discover & Book Local Travel Packages</h2>
        <p>Ulaago connects travelers with trusted local providers to explore hidden gems across the country. Easy bookings, authentic experiences.</p>
        <div className="lp-hero-button">
          <Link to="/packages">
            <button className="lp-button">Explore Packages</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-features">
        <h3>Features</h3>
        <ul className="lp-feature-list">
          <li>
            <h4>For Travelers</h4>
            <p>Browse packages, book securely, and get local experiences.</p>
          </li>
          <li>
            <h4>For Creators</h4>
            <p>Create travel plans and get bookings directly from users.</p>
          </li>
          <li>
            <h4>Real-Time Updates</h4>
            <p>Manage bookings and communicate in real-time.</p>
          </li>
        </ul>
      </section>

      {/* About Section */}
      <section id="about" className="lp-about">
        <h3>About Ulaago</h3>
        <p>Ulaago is a travel platform that bridges the gap between local experience providers and adventure seekers. We help travelers find authentic, curated travel packages and let local businesses grow their visibility.</p>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} Ulaago. All rights reserved.</p>
        <ul className="lp-footer-links">
          <li><a href="#">Instagram</a></li>
          <li><a href="#">YouTube</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;
