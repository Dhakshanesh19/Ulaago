import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ userType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option === 'Create Package') navigate('/create-package');
    else if (option === 'Bookings') console.log('Go to Bookings');
    else if (option === 'Services') console.log('Go to Services');
  };

  const allOptions = ['Create Package', 'Bookings', 'Services'];
  const vloggerOptions = ['Bookings'];
  const options = userType === 'provider' ? allOptions : vloggerOptions;

  // 🔄 Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">Ulaago</div>
        <div className="account-menu">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            My Account ⌄
          </button>
          {dropdownOpen && (
            <ul className="dropdown">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* ✨ Show uploaded packages */}
      <div className="package-section">
        {packages.length === 0 ? (
          <div className="empty-state">
            <p>No packages uploaded yet</p>
            <button className="plus-button" onClick={() => navigate('/create-package')}>+</button>
          </div>
        ) : (
          <div className="package-grid">
            {packages.map((pkg) => (
              <div className="package-card" key={pkg._id}>
                <img
                   src={`http://localhost:5000${pkg.coverImageUrl}`}
                   alt={pkg.packageName}
                   style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                <div className="package-details">
                  <h3>{pkg.packageName}</h3>
                  <p>{pkg.location} - {pkg.duration}</p>
                  <p>₹{pkg.price}</p>
                  <p>{pkg.description}</p>
                  <p><strong>Contact:</strong> {pkg.contactName} - {pkg.contactNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
