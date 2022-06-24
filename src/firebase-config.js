// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtI7_hduNwcPPBxBjroGukesHW-USa1RA",
  authDomain: "yelp411-e4f5a.firebaseapp.com",
  projectId: "yelp411-e4f5a",
  storageBucket: "yelp411-e4f5a.appspot.com",
  messagingSenderId: "268654216499",
  appId: "1:268654216499:web:8f3e3dbb332782fa6a2a46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
