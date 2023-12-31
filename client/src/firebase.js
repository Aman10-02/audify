// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3NbomXkNvyRcDFvWiPRoIzdCyJ4LpI5A",
  authDomain: "audify-2a5df.firebaseapp.com",
  projectId: "audify-2a5df",
  storageBucket: "audify-2a5df.appspot.com",
  messagingSenderId: "962410092265",
  appId: "1:962410092265:web:2aaf65afe368878ed54278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth }