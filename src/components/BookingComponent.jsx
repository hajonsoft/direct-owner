import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingComponent.css';

const BookingComponent = () => {
  const { userId, listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'stripe', // default payment method
  });
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    fetchListing(userId, listingId);
  }, [userId, listingId]);

  const fetchListing = async (userId, listingId) => {
    const docRef = doc(db, 'users', userId, 'listings', listingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setListing(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const handleChange = (e) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const bookingsRef = collection(db, 'users', userId, 'listings', listingId, 'bookings');
    try {
      await addDoc(bookingsRef, guestDetails);
      alert('Booking successful');
      navigate(`/`);
    } catch (error) {
      console.error('Error making booking:', error);
      alert('Error making booking');
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-container">
      <h2>Book {listing.title}</h2>
      <div className="listing-details">
        <p>{listing.description}</p>
        <p>Price: {listing.price}</p>
        <div className="listing-images">
          {listing.images.map((url, index) => (
            <img key={index} src={url} alt={`Listing ${index}`} />
          ))}
        </div>
      </div>
      <div className="guest-details-form">
        <h3>Guest Details</h3>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={guestDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={guestDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={guestDetails.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>
        <label>
          Payment Method
          <select name="paymentMethod" value={guestDetails.paymentMethod} onChange={handleChange}>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="crypto">Crypto</option>
          </select>
        </label>
        <button onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default BookingComponent;