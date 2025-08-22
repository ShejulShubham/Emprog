import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const itemsCollection = collection(db, "items");

// Create Item
export const createItem = async (item) => {
  const docRef = await addDoc(itemsCollection, item);
  return { id: docRef.id, ...item };
};

// Get All Items
export const getItems = async () => {
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update Item
export const updateItem = async (id, updatedData) => {
  const docRef = doc(db, "items", id);
  await updateDoc(docRef, updatedData);
};

// Delete Item
export const deleteItem = async (id) => {
  const docRef = doc(db, "items", id);
  await deleteDoc(docRef);
};
