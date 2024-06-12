import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './SettingsComponent.css';

const SettingsComponent = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    stripeAccount: '',
    paypalEmail: '',
    bankAccount: '',
    cryptoWallet: '',
  });
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchSettings(user.uid);
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchSettings = async (userId) => {
    const docRef = doc(db, 'users', userId, 'settings', 'payout');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSettings(docSnap.data());
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save settings');
      return;
    }

    const docRef = doc(db, 'users', user.uid, 'settings', 'payout');
    try {
      await setDoc(docRef, settings);
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-form">
        <label>
          Stripe Account
          <input
            type="text"
            name="stripeAccount"
            value={settings.stripeAccount}
            onChange={handleChange}
            placeholder="Enter your Stripe account ID"
          />
        </label>
        <label>
          PayPal Email
          <input
            type="email"
            name="paypalEmail"
            value={settings.paypalEmail}
            onChange={handleChange}
            placeholder="Enter your PayPal email"
          />
        </label>
        <label>
          Bank Account
          <input
            type="text"
            name="bankAccount"
            value={settings.bankAccount}
            onChange={handleChange}
            placeholder="Enter your bank account details"
          />
        </label>
        <label>
          Crypto Wallet
          <input
            type="text"
            name="cryptoWallet"
            value={settings.cryptoWallet}
            onChange={handleChange}
            placeholder="Enter your crypto wallet address"
          />
        </label>
        <button onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsComponent;