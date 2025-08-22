import { createItem, getItems, updateItem, deleteItem } from "../firebase/item";

const LOCAL_STORAGE_KEY = "items";

// ✅ Save items to LocalStorage
export const saveItemsToLocal = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// ✅ Get items from LocalStorage
export const getItemsFromLocal = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// ✅ Add item (update local + Firestore)
export const addNewItem = async (item) => {
  const newItem = await createItem(item);
  const localItems = getItemsFromLocal();
  localItems.push(newItem);
  saveItemsToLocal(localItems);
  return newItem;
};

// ✅ Fetch items (check local first, fallback to Firestore)
export const fetchItems = async () => {
  let localItems = getItemsFromLocal();
  if (localItems.length > 0) {
    return localItems;
  }
  const firestoreItems = await getItems();
  saveItemsToLocal(firestoreItems);
  return firestoreItems;
};

// ✅ Update item (both local + Firestore)
export const updateExistingItem = async (id, updatedData) => {
  await updateItem(id, updatedData);
  let localItems = getItemsFromLocal();
  localItems = localItems.map(item => item.id === id ? { ...item, ...updatedData } : item);
  saveItemsToLocal(localItems);
};

// ✅ Delete item (both local + Firestore)
export const deleteExistingItem = async (id) => {
  await deleteItem(id);
  let localItems = getItemsFromLocal();
  localItems = localItems.filter(item => item.id !== id);
  saveItemsToLocal(localItems);
};

// ✅ Clear LocalStorage (optional utility)
export const clearLocalItems = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
