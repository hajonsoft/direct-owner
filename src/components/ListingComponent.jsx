import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ListingComponent.css';

const ListingComponent = () => {
  const [user, setUser] = useState(null);
  const [listing, setListing] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleAddListing = async () => {
    if (!user) {
      alert('You must be logged in to add a listing');
      return;
    }

    // Upload images to Firebase Storage
    const imageUrls = await Promise.all(
      Array.from(imageFiles).map(async (file) => {
        const imageRef = ref(storage, `users/${user.uid}/images/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        return url;
      })
    );

    // Save listing information to Firestore
    const listingData = {
      ...listing,
      images: imageUrls,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    const docRef = doc(db, `users/${user.uid}/listings/${new Date().toISOString()}`);
    try {
      await setDoc(docRef, listingData);
      alert('Listing added successfully');
      setListing({
        title: '',
        description: '',
        price: '',
        location: '',
        images: [],
      });
      setImageFiles([]);
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Error adding listing');
    }
  };

  return (
    <div className="listing-container">
      <h2>Add a New Listing</h2>
      <input
        type="text"
        name="title"
        value={listing.title}
        onChange={handleChange}
        placeholder="Listing Title"
      />
      <textarea
        name="description"
        value={listing.description}
        onChange={handleChange}
        placeholder="Listing Description"
      />
      <input
        type="text"
        name="price"
        value={listing.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="location"
        value={listing.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleAddListing}>Add Listing</button>
    </div>
  );
};

export default ListingComponent;