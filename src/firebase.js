// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBzdMn6FMr6Vfa6dUAveXu928utucPLlwA",
  authDomain: "direct-owner.firebaseapp.com",
  projectId: "direct-owner",
  storageBucket: "direct-owner.appspot.com",
  messagingSenderId: "569989050121",
  appId: "1:569989050121:web:99f494a8bb34e8c56aadd8",
  measurementId: "G-JY2KJFM8MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };