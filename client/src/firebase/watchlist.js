import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * ✅ Helper to get the watchlist subcollection reference
 * Path: users / {userId} / watchlist
 */
const getWatchlistCollection = (userId) => {
  if (!userId) throw new Error("User ID is required.");
  return collection(db, "users", userId, "watchlist");
};

/**
 * ✅ Create Watchlist Item
 */
export const createWatchlistItem = async (item, userId) => {
  const docRef = await addDoc(getWatchlistCollection(userId), item);
  
  return { id: docRef.id, ...item };
};

/**
 * ✅ Get Watchlist Items
 */
export const getWatchlistItems = async (userId) => {
  const snapshot = await getDocs(getWatchlistCollection(userId));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * ✅ Update Watchlist Item
 */
export const updateWatchlistItem = async (userId, itemId, updatedData) => {
  if (!userId || !itemId) throw new Error("User ID and Item ID are required.");
  
  const docRef = doc(db, "users", userId, "watchlist", itemId);
  await updateDoc(docRef, updatedData);
};

/**
 * ✅ Delete Watchlist Item
 */
export const deleteWatchlistItem = async (userId, itemId) => {
  if (!userId || !itemId) throw new Error("User ID and Item ID are required.");
  
  const docRef = doc(db, "users", userId, "watchlist", itemId);
  await deleteDoc(docRef);
};