import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; // ✅ Adjust this if needed

const HomePage = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Not logged in');
        const data = await res.json();
        onLogin(data.user);
      } catch (err) {
        console.log('Not logged in');
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then(res => res.json())
      .then(data => setPackages(data.slice(0, 3)))
      .catch(err => console.error('Failed to fetch packages:', err));
  }, []);

  const handleBrowsePackages = () => navigate('/packages');
  const handleMyBookings = () => navigate('/profile?tab=mybookings');
  const handleCreatePackage = () => navigate('/create-package');

  const handleBookNow = async (packageId) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Not logged in');
      const data = await res.json();
      onLogin(data.user);
      navigate(`/book/${packageId}`);
    } catch {
      navigate(`/login?redirect=/book/${packageId}`);
    }
  };

  return (
    <div id="hp-container">
      <header className="hp-header">
        <h1>Welcome to Ulaago</h1>
        {user && <p>Hello, {user.name}!</p>}
      </header>

      <section className="hp-intro">
        <h2>🌍 Explore Travel Packages</h2>
        <p>Find curated travel experiences from trusted local providers.</p>

        <div className="hp-package-grid">
          {packages.length === 0 ? (
            <p>No packages available.</p>
          ) : (
            packages.map((pkg) => (
              <div className="hp-package-card" key={pkg._id}>
                <img
                  src={`http://localhost:5000${pkg.coverImageUrl}`}
                  alt={pkg.packageName}
                  className="hp-package-img"
                />
                <h3>{pkg.packageName}</h3>
                <p><strong>Location:</strong> {pkg.location}</p>
                <p><strong>Price:</strong> ₹{pkg.price}</p>
                <p><strong>Duration:</strong> {pkg.duration}</p>
                <button onClick={() => handleBookNow(pkg._id)} className="hp-book-button">
                  🚀 Book Now
                </button>
              </div>
            ))
          )}
        </div>

        <div className="hp-browse">
          <button onClick={handleBrowsePackages}>Browse All Packages</button>
        </div>
      </section>

      <section className="hp-benefits">
        <h3>Why Ulaago?</h3>
        <ul>
          <li><h4>✅ Verified Local Hosts</h4><p>All providers are vetted for safety and quality.</p></li>
          <li><h4>💡 Seamless Booking</h4><p>Instant confirmation, clear pricing, and simple process.</p></li>
          <li><h4>🌟 Real User Reviews</h4><p>Read trusted reviews before booking your next trip.</p></li>
        </ul>
      </section>

      <section className="hp-actions">
        {user?.role === 'admin' ? (
          <>
            <h3>📦 Manage Packages</h3>
            <button onClick={handleCreatePackage}>Create New Package</button>
            <button onClick={handleMyBookings}>View Bookings</button>
          </>
        ) : (
          <>
            <h3>✈️ Ready to Travel?</h3>
            <button onClick={handleBrowsePackages}>Explore Packages</button>
            <button onClick={handleMyBookings}>My Bookings</button>
          </>
        )}
      </section>

      <footer className="hp-footer">
        <p>© {new Date().getFullYear()} Ulaago. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
