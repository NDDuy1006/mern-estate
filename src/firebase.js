// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3n9kB_Qz0bFfM-UnO2tyhlNJQekgPM4w",
  authDomain: "mern-realtor-8c892.firebaseapp.com",
  projectId: "mern-realtor-8c892",
  storageBucket: "mern-realtor-8c892.firebasestorage.app",
  messagingSenderId: "101255552670",
  appId: "1:101255552670:web:ae951ff4274dc3eb86a58f",
  measurementId: "G-6SS4EWZJ60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);