// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "devlog-797f5.firebaseapp.com",
  projectId: "devlog-797f5",
  storageBucket: "devlog-797f5.appspot.com",
  messagingSenderId: "899443177666",
  appId: "1:899443177666:web:58fbe39e9d18548024635b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);