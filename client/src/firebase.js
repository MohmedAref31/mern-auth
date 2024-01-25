import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9f80c.firebaseapp.com",
  projectId: "mern-auth-9f80c",
  storageBucket: "mern-auth-9f80c.appspot.com",
  messagingSenderId: "604939994663",
  appId: "1:604939994663:web:77e111d4a4fc01ff38b002"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);