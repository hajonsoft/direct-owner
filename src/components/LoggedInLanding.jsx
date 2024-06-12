// src/components/LoggedInLanding.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LoggedInLanding.css';

const LoggedInLanding = () => {
  return (
    <div className="loggedin-landing">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/add-listing" className="dashboard-link">Add Listing</Link>
        <Link to="/view-listings" className="dashboard-link">View Listings</Link>
        <Link to="/payments" className="dashboard-link">Payments</Link>
        <Link to="/profile" className="dashboard-link">Profile</Link>
        <Link to="/settings" className="dashboard-link">Settings</Link>
        <Link to="/support" className="dashboard-link">Support</Link>
      </div>
    </div>
  );
};

export default LoggedInLanding;