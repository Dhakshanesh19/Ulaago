import React from 'react';

const OverviewTab = ({ user }) => {
  return (
    <div>
      <h3>Profile Overview</h3>
      <p>Welcome, <strong>{user?.name}</strong>! This is your dashboard where you can manage bookings and explore packages.</p>
    </div>
  );
};

export default OverviewTab;
