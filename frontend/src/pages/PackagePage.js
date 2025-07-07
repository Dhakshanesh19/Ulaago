import React, { useEffect, useState } from 'react';

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading packages...</p>;

  return (
    <div>
      <h2>Available Travel Packages</h2>
      <div>
        {packages.map((pkg) => (
          <div key={pkg._id}>
            <img
              src={`http://localhost:5000/uploads/${pkg.coverImageUrl}`}
              alt={pkg.packageName}
            />
            <h3>{pkg.packageName}</h3>
            <p>Location: {pkg.location}</p>
            <p>Price: ₹{pkg.price}</p>
            <p>Duration: {pkg.duration}</p>
            <p>{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
