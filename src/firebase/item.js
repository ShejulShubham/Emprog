import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

// ✅ Create a user-specific collection reference
const getUserItemsCollection = () => collection(db, "items");

// ✅ Create Item (with userId attached)
export const createItem = async (item, userId) => {
  if (!userId) throw new Error("User ID is required for creating an item.");
  
  const docRef = await addDoc(getUserItemsCollection(), {
    ...item,
    userId
  });
  return { id: docRef.id, ...item, userId };
};

// ✅ Get Items (only items belonging to the user)
export const getItems = async (userId) => {
  if (!userId) throw new Error("User ID is required to fetch items.");
  
  const q = query(getUserItemsCollection(), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ Update Item (verify userId before update)
export const updateItem = async (id, updatedData, userId) => {
  if (!userId) throw new Error("User ID is required to update item.");
  
  const docRef = doc(db, "items", id);
  await updateDoc(docRef, {
    ...updatedData
  });
};

// ✅ Delete Item (verify userId before delete)
export const deleteItem = async (id, userId) => {
  if (!userId) throw new Error("User ID is required to delete item.");
  
  const docRef = doc(db, "items", id);
  await deleteDoc(docRef);
};
