import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAOyv2nyCcsDK0avw1qurZW1dapftwz5TA",
    authDomain: "save-a-stray-40e56.firebaseapp.com",
    projectId: "save-a-stray-40e56",
    storageBucket: "save-a-stray-40e56.appspot.com",
    messagingSenderId: "767492186893",
    appId: "1:767492186893:web:e9e9ef6c165e144c9a4644"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function UploadImage() {
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
        const storageRef = ref(storage, `images/${image.name}`);
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}
