import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useAuth } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Make sure this is your Firebase auth export

const FirestoreComponent = () => {
  const [user] = useAuth(auth);
  const [listing, setListing] = useState({ title: '', description: '' });
  const db = getFirestore();

  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleAddListing = async () => {
    if (!user) {
      alert('You must be logged in to add a listing');
      return;
    }

    const docRef = doc(db, `users/${user.uid}/listings/${new Date().toISOString()}`);
    try {
      await setDoc(docRef, listing);
      alert('Listing added successfully');
      setListing({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Error adding listing');
    }
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={listing.title}
        onChange={handleChange}
        placeholder="Listing Title"
      />
      <input
        type="text"
        name="description"
        value={listing.description}
        onChange={handleChange}
        placeholder="Listing Description"
      />
      <button onClick={handleAddListing}>Add Listing</button>
    </div>
  );
};

export default FirestoreComponent;