// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Add this line
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm7KRBxOUezhWhnBT7vUdZ0uAtyTOvC3M",
  authDomain: "upsclae-9ce17.firebaseapp.com",
  projectId: "upsclae-9ce17",
  storageBucket: "upsclae-9ce17.firebasestorage.app",
  messagingSenderId: "197610749307",
  appId: "1:197610749307:web:e495aa5dd793cc9af291de",
  measurementId: "G-8HF0DJFEFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export db for Firestore access
export const db = getFirestore(app);
