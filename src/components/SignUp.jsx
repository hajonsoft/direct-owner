// src/components/SignUp.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to login page or directly to the user dashboard
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up with Google</h2>
      {error && <p className="error">{error}</p>}
      <button onClick={handleGoogleSignIn} className="google-signin-button">Sign Up with Google</button>
    </div>
  );
};

export default SignUp;