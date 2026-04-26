import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC_mS8LhKPOuwhMxxRmqVDe1dc8d4WkNw",
  authDomain: "mansao-sabor.firebaseapp.com", // Tentative
  projectId: "mansao-sabor", // Tentative
  storageBucket: "mansao-sabor.firebasestorage.app",
  messagingSenderId: "TBD",
  appId: "TBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
