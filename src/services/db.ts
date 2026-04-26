import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { db } from "../lib/firebase";

// THREADS (COMMUNITY)
export const getThreads = async () => {
  const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addThread = async (thread: any) => {
  return await addDoc(collection(db, "threads"), {
    ...thread,
    createdAt: serverTimestamp()
  });
};

// PRODUCTS (DRINKS & COMBOS)
export const getProducts = async () => {
  const q = query(collection(db, "products"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product: any) => {
  return await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp()
  });
};

export const getProductById = async (id: string) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// ADMIN CHECK
export const checkIfAdmin = async (uid: string) => {
  const adminDoc = await getDoc(doc(db, "admins", uid));
  return adminDoc.exists();
};
