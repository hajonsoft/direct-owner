import React from 'react';

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Why Choose DirectBookings?</h2>
      <div className="feature-cards">
        <div className="card">
          <h3>Lower Fees</h3>
          <p>Only 1% commission or a one-time upfront fee. Significantly lower than other platforms.</p>
        </div>
        <div className="card">
          <h3>Direct Payments</h3>
          <p>Accept payments directly from your guests. No middleman involved.</p>
        </div>
        <div className="card">
          <h3>Customizable Listings</h3>
          <p>Create and manage your property listings with ease. Get your own customized page.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;