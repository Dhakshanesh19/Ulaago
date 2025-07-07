import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then(res => res.json())
      .then(data => setPackages(data.slice(0, 3))) // Limit to 3
      .catch(err => console.error('Failed to fetch packages:', err));
  }, []);

  const handleBrowsePackages = () => {
    navigate('/package');
  };

  const handleMyBookings = () => {
    navigate('/profile?tab=mybookings');
  };

  const handleCreatePackage = () => {
    navigate('/create-package');
  };

  const handleBookNow = (packageId) => {
    // ✅ Redirect user to booking flow (example)
    navigate(`/book/${packageId}`);
  };

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />

      <header>
        <h1>Welcome to Ulaago</h1>
        {user && <p>Hello, {user.name}!</p>}
      </header>

      <section>
        <h2>Explore Travel Packages</h2>
        <p>Find curated travel experiences from trusted local providers.</p>

        {/* ✅ Package Preview with Book Now */}
        <div className="home-package-preview">
          {packages.length === 0 ? (
            <p>No packages available.</p>
          ) : (
            packages.map((pkg) => (
              <div key={pkg._id} className="package-card">
                <img
                  src={`http://localhost:5000/uploads/${pkg.coverImageUrl}`}
                  alt={pkg.packageName}
                  className="package-image"
                />
                <h3>{pkg.packageName}</h3>
                <p><strong>Location:</strong> {pkg.location}</p>
                <p><strong>Price:</strong> ₹{pkg.price}</p>
                <p><strong>Duration:</strong> {pkg.duration}</p>
                <button onClick={() => handleBookNow(pkg._id)}>Book Now</button>
              </div>
            ))
          )}
        </div>

        <button onClick={handleBrowsePackages}>Browse All Packages</button>
      </section>

      <section>
        <h3>Why Ulaago?</h3>
        <ul>
          <li><h4>Verified Local Hosts</h4><p>All providers are vetted for safety and quality.</p></li>
          <li><h4>Seamless Booking</h4><p>Instant confirmation, clear pricing, and simple process.</p></li>
          <li><h4>Real User Reviews</h4><p>Read trusted reviews before booking your next trip.</p></li>
        </ul>
      </section>

      <section>
        {user?.userType === 'provider' ? (
          <>
            <h3>Manage Your Packages</h3>
            <button onClick={handleCreatePackage}>Create New Package</button>
            <button onClick={handleMyBookings}>View Bookings</button>
          </>
        ) : (
          <>
            <h3>Ready to Travel?</h3>
            <button onClick={handleBrowsePackages}>Explore Packages</button>
            <button onClick={handleMyBookings}>My Bookings</button>
          </>
        )}
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Ulaago. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
