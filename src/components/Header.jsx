// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      <nav>
        <div className="logo">DirectBookings</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!user && <li><Link to="/signup" className="cta">Sign Up</Link></li>}
          {!user && <li><Link to="/login" className="cta">Login</Link></li>}
          {user && (
            <>
              <li>Hello, {user.displayName}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;