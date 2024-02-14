// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-app-4617e.firebaseapp.com",
  projectId: "mern-app-4617e",
  storageBucket: "mern-app-4617e.appspot.com",
  messagingSenderId: "501625867584",
  appId: "1:501625867584:web:f8e6ee5a13508098493ea5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);