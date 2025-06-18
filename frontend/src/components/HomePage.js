import React, { useState, useEffect, useRef } from 'react'; // <--- Import useRef
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ userType, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // <--- Create a ref for the dropdown container

  const API_BASE_URL = 'http://localhost:5000';

  // Function to close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the dropdown is open AND the click happened outside the dropdownRef's current element
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick); // Use mousedown for better behavior with button clicks

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]); // Re-run effect when dropdownOpen changes

  const handleOptionClick = (option) => {
    setDropdownOpen(false); // Close dropdown on click

    if (option === 'Dashboard') {
      navigate('/dashboard');
    } else if (option === 'Create Package') {
      navigate('/create-package');
    } else if (option === 'Admin Dashboard') {
      navigate('/admin-dashboard');
    } else if (option === 'Logout') {
      if (onLogout) {
        onLogout();
      }
      navigate('/login');
    } else if (option === 'Contact Us') {
      navigate('/contact-us');
    } else if (option === 'Login / Register') { // Handle this option if it appears
        navigate('/login'); // Assuming login is also registration
    }
  };

  const getDropdownOptions = () => {
    let options = [];

    if (userType) {
      options.push('Dashboard');
    }

    if (userType === 'admin') {
      options.push('Admin Dashboard');
      options.push('Create Package');
    } else if (userType === 'provider') {
      options.push('Create Package');
    }

    if (userType) {
      options.push('Contact Us');
      options.push('Logout');
    } else {
      options.push('Login / Register');
    }

    return options;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      }
    };

    fetchPackages();
  }, [API_BASE_URL]);

  return (
    <div className="home-page-container">
      <header className="header">
        <div className="site-logo">Ulaago</div>
        <nav className="account-nav" ref={dropdownRef}> {/* <--- Attach ref to the nav element */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)} // Removed e.stopPropagation() here as ref handles it better
            className="account-button"
          >
            My Account <span>&#9662;</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu"> {/* This class is correctly applied */}
              {getDropdownOptions().map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="dropdown-menu-item"
                >
                  {/* ... SVG icons remain the same ... */}
                  {option === 'Dashboard' && (
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg>
                  )}
                  {option === 'Create Package' && (
                    <svg className="dropdown-icon" viewBox="0 0 20 20"><path d="M11 5H9V9H5v2h4v4h2v-4h4V9h-4V5z"></path><path d="M2 4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H2zm0 2h16v8H2V6z"></path></svg>
                  )}
                  {option === 'Admin Dashboard' && (
                    <svg className="dropdown-icon" viewBox="0 0 20 20"><path d="M10 3a1 1 0 00-1 1v2a1 1 0 002 0V4a1 1 0 00-1-1zm-4 5a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1H7a1 1 0 00-1 1v2zm8 4a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm-8 0a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z"></path></svg>
                  )}
                  {option === 'Logout' && (
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path></svg>
                  )}
                  {option === 'Contact Us' && (
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                  )}
                  {option}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      {/* ... rest of your HomePage component remains the same ... */}
      <section className="hero-section">
        <h1 className="hero-title">Your Next Adventure Awaits!</h1>
        <p className="hero-subtitle">Discover amazing travel packages designed just for you.</p>
        <button
          onClick={() => { /* Implement a search or browse all packages action */ }}
          className="hero-button"
        >
          Explore Packages
        </button>
      </section>

      <div className="main-content-area">
        {packages.length === 0 ? (
          <div className="no-packages-message">
            <p>No packages uploaded yet!</p>
            <p>It looks like there aren't any travel packages available right now. Check back soon, or if you're a provider, create one!</p>
            {(userType === 'admin' || userType === 'provider') && (
              <button
                className="create-package-button"
                onClick={() => navigate('/create-package')}
                title="Create New Package"
              >
                +
              </button>
            )}
          </div>
        ) : (
          <>
            <h2 className="packages-heading">Our Exciting Travel Packages</h2>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="package-card"
                  onClick={() => navigate(`/package/${pkg._id}`)}
                >
                  <div className="package-image-wrapper">
                    <img
                      src={`${API_BASE_URL}${pkg.coverImageUrl}`}
                      alt={pkg.packageName}
                      className="package-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300/F3F4F6/9CA3AF?text=No+Image"; }}
                    />
                    <div className="package-name-overlay">
                      <h3 className="package-name">{pkg.packageName}</h3>
                    </div>
                  </div>
                  <div className="package-details">
                    <p className="package-location-duration">
                      <svg className="package-icon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                      {pkg.location} - <span className="package-duration">{pkg.duration}</span>
                    </p>
                    <p className="package-price">₹{pkg.price}</p>
                    <p className="package-description">
                      {pkg.description}
                    </p>
                    <div className="package-meta">
                      <p className="package-meta-item">
                        <strong>Dates:</strong> {pkg.dates}
                      </p>
                      <p className="package-meta-item">
                        <strong>Contact:</strong> {pkg.contactName} - {pkg.contactNumber}
                      </p>
                      <p className="package-meta-item">
                        <strong>Facilities:</strong> {
                          pkg.facilities ? Object.keys(pkg.facilities).filter(key => pkg.facilities[key]).map(f => f.replace(/([A-Z])/g, ' $1').trim()).join(', ') : 'None'
                        }
                      </p>
                      {pkg.vlogLink && (
                        <p className="package-vlog-link-wrapper">
                          <a href={pkg.vlogLink} target="_blank" rel="noopener noreferrer" className="package-vlog-link">
                            <svg className="package-icon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.454A1 1 0 0111 8v4a1 1 0 01-1.555.832l-3-2a1 1 0 010-1.664l3-2z" clipRule="evenodd"></path></svg>
                            Watch Vlog
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Ulaago. All rights reserved.</p>
        <p>Designed with &#x2764; for amazing travels.</p>
      </footer>
    </div>
  );
};

export default HomePage;