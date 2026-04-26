import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const registerWithEmail = async (email: string, pass: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering with email:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, pass: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    if (!userCredential.user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
