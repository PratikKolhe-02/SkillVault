import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, 
  authDomain: "skillvault-e77a3.firebaseapp.com",
  projectId: "skillvault-e77a3",
  storageBucket: "skillvault-e77a3.firebasestorage.app",
  messagingSenderId: "456454737834",
  appId: "1:456454737834:web:4e517dfae3e6ebee2865d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };