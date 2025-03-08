// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvzaSmuHLCGsyEdNpxYXnzbul95y4P76k",
  authDomain: "my-realtor-c17bf.firebaseapp.com",
  projectId: "my-realtor-c17bf",
  storageBucket: "my-realtor-c17bf.appspot.com",
  messagingSenderId: "196589119117",
  appId: "1:196589119117:web:3de93e181a28df3b12a4c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);