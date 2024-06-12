import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewListingComponent.css';

const ViewListingComponent = () => {
  const [user, setUser] = useState(null);
  const [listing, setListing] = useState(null);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchListing(user.uid, listingId);
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, listingId, navigate]);

  const fetchListing = async (userId, listingId) => {
    const docRef = doc(db, 'users', userId, 'listings', listingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setListing(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-listing-container">
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>Price: {listing.price}</p>
      <p>Location: {listing.location}</p>
      <div className="listing-images">
        {listing.images.map((url, index) => (
          <img key={index} src={url} alt={`Listing ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ViewListingComponent;