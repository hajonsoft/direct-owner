import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Make sure this is your Firebase auth export

const UploadComponent = () => {
  const [user] = useAuth(auth);
  const [file, setFile] = useState(null);
  const storage = getStorage();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!user) {
      alert('You must be logged in to upload a file');
      return;
    }

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const fileRef = ref(storage, `users/${user.uid}/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadComponent;