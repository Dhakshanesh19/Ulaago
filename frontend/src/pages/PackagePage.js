import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PackagePage.css';

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/packages`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch packages');
        return res.json();
      })
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching packages:', err);
        setLoading(false);
      });
  }, [API_BASE]);

  const handleBookNow = (packageId) => {
    navigate(`/book/${packageId}`);
  };

  if (loading) return <p className="pp-loading">🔄 Loading packages...</p>;

  return (
    <div className="pp-container" id="pp-package-list">
      <h2 className="pp-heading">📦 Available Travel Packages</h2>
      {packages.length === 0 ? (
        <p className="pp-empty-msg">No packages available at the moment.</p>
      ) : (
        <div className="pp-grid">
          {packages.map((pkg) => (
            <div className="pp-card" key={pkg._id}>
              <img
                className="pp-image"
                src={`${API_BASE}${pkg.coverImageUrl}`}
                alt={pkg.packageName}
              />
              <h3 className="pp-title">{pkg.packageName}</h3>
              <p><strong>Location:</strong> {pkg.location}</p>
              <p><strong>Price:</strong> ₹{pkg.price}</p>
              <p><strong>Duration:</strong> {pkg.duration}</p>
              <p className="pp-description">{pkg.description}</p>
              <button className="pp-book-button" onClick={() => handleBookNow(pkg._id)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagePage;
