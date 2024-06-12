// src/components/Login.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to the user dashboard or home page after successful login
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Google</h2>
      {error && <p className="error">{error}</p>}
      <button onClick={handleGoogleLogin} className="google-login-button">Login with Google</button>
    </div>
  );
};

export default Login;