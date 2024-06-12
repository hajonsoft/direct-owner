import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './ViewListingsComponent.css';

const ViewListingsComponent = () => {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchListings(user.uid);
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchListings = async (userId) => {
    const q = query(collection(db, 'users', userId, 'listings'));
    const querySnapshot = await getDocs(q);
    const listingsArray = [];
    querySnapshot.forEach((doc) => {
      listingsArray.push({ id: doc.id, ...doc.data() });
    });
    setListings(listingsArray);
  };

  const handleDeleteListing = async (listingId) => {
    if (!user) {
      alert('You must be logged in to delete a listing');
      return;
    }

    const docRef = doc(db, 'users', user.uid, 'listings', listingId);
    try {
      await deleteDoc(docRef);
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== listingId));
      alert('Listing deleted successfully');
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Error deleting listing');
    }
  };

  return (
    <div className="view-listings-container">
      <h2>Your Listings</h2>
      <h4>
        {user && (
          <Link to={`/public-listings/${user.uid}`} className="view-link">Public URL</Link>
        )}
      </h4>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <h3>{listing.title}</h3>
            <Link to={`/public-listings/${user.uid}`} className="public-url">View Public URL</Link>
            <p>{listing.description}</p>
            <Link to={`/view-listing/${listing.id}`} className="view-link">View</Link>
            <button onClick={() => handleDeleteListing(listing.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewListingsComponent;