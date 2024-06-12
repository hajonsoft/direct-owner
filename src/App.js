import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LoggedInLanding from './components/LoggedInLanding';
import ListingComponent from './components/ListingComponent';
import ViewListingsComponent from './components/ViewListingsComponent';
import ViewListingComponent from './components/ViewListingComponent';
import SettingsComponent from './components/SettingsComponent';
import PublicListingsComponent from './components/PublicListingsComponent';
import BookingComponent from './components/BookingComponent';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={user ? <LoggedInLanding /> : (
            <>
              <Hero />
              <Features />
              <About />
              <Contact />
            </>
          )} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-listing" element={<ListingComponent />} />
          <Route path="/view-listings" element={<ViewListingsComponent />} />
          <Route path="/view-listing/:listingId" element={<ViewListingComponent />} />
          <Route path="/settings" element={<SettingsComponent />} />
          <Route path="/payments" element={<div>Payments Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/support" element={<div>Support Page</div>} />
          <Route path="/public-listings/:userId" element={<PublicListingsComponent />} />
          <Route path="/book-listing/:userId/:listingId" element={<BookingComponent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;