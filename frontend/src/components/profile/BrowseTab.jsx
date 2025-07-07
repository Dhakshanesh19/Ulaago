import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseTab = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div>
      <h3>Browse Travel Packages</h3>
      {packages.length === 0 ? (
        <p>No packages available at the moment.</p>
      ) : (
        <ul>
          {packages.map(pkg => (
            <li key={pkg._id}>
              <strong>{pkg.packageName}</strong> - {pkg.location} - ₹{pkg.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrowseTab;
