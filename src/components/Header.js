import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">DirectBookings</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/signup" className="cta">Sign Up</a></li>
          <li><a href="/login" className="cta">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;