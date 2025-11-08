import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm7KRBxOUezhWhnBT7vUdZ0uAtyTOvC3M",
  authDomain: "upsclae-9ce17.firebaseapp.com",
  projectId: "upsclae-9ce17",
  storageBucket: "upsclae-9ce17.appspot.com",
  messagingSenderId: "197610749307",
  appId: "1:197610749307:web:e495aa5dd793cc9af291de",
  measurementId: "G-8HF0DJFEFX"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Google
export const googleProvider = new GoogleAuthProvider();

// Firestore (stable on localhost)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const ts = serverTimestamp;
