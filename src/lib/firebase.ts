import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6pnKN7kgPVjphy9fpVu8ill-pSrDdTqs",
  authDomain: "mansao-sabor.firebaseapp.com",
  projectId: "mansao-sabor",
  storageBucket: "mansao-sabor.firebasestorage.app",
  messagingSenderId: "927459371248",
  appId: "1:927459371248:web:ace9d1e00887512d467a35",
  measurementId: "G-R855B7FXBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
