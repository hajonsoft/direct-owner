import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './BookingComponent.css';

const BookingComponent = () => {
  const { userId, listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    pets: false,
    paymentMethod: 'stripe',
  });
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    if (userId && listingId) {
      fetchListing(userId, listingId);
    }
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
    const { name, value, type, checked } = e.target;
    setGuestDetails({
      ...guestDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
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
        <Carousel className="listing-images" showThumbs={false}>
          {listing.images.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Listing ${index}`} />
            </div>
          ))}
        </Carousel>
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
          Start Date
          <input
            type="date"
            name="startDate"
            value={guestDetails.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            name="endDate"
            value={guestDetails.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Adults
          <input
            type="number"
            name="adults"
            value={guestDetails.adults}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Children
          <input
            type="number"
            name="children"
            value={guestDetails.children}
            onChange={handleChange}
            min="0"
          />
        </label>
        <label>
          Infants
          <input
            type="number"
            name="infants"
            value={guestDetails.infants}
            onChange={handleChange}
            min="0"
          />
        </label>
        <label>
          Pets
          <input
            type="checkbox"
            name="pets"
            checked={guestDetails.pets}
            onChange={handleChange}
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