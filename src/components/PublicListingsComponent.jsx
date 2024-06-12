import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import './PublicListingsComponent.css';

const PublicListingsComponent = () => {
  const { userId } = useParams();
  const [listings, setListings] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    fetchListings(userId);
  }, [userId]);

  const fetchListings = async (userId) => {
    const q = query(collection(db, 'users', userId, 'listings'));
    const querySnapshot = await getDocs(q);
    const listingsArray = [];
    querySnapshot.forEach((doc) => {
      listingsArray.push({ id: doc.id, ...doc.data() });
    });
    setListings(listingsArray);
  };

  return (
    <div className="public-listings-container">
      <h2>Listings</h2>
      <div className="listings-grid">
        {listings.map((listing) => (
          <Link to={`/book-listing/${userId}/${listing.id}`} key={listing.id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PublicListingsComponent;