// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5YtoW5UyGpbgk-Z7Hk0R9BpYKjp0EjtQ",
  authDomain: "portfolio-6c55f.firebaseapp.com",
  projectId: "portfolio-6c55f",
  storageBucket: "portfolio-6c55f.firebasestorage.app",
  messagingSenderId: "843286211867",
  appId: "1:843286211867:web:3772c1a4915ec13ff177be",
  measurementId: "G-4EBLQ6C9GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: analytics (no effect if not used)
//const analytics = getAnalytics(app);

// ✅ Export this for login/register/logout
export const auth = getAuth(app);