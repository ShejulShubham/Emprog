import { createItem, getItems, updateItem, deleteItem } from "../firebase/item";
import useAuthStore, {
  selectIsLoggedIn,
  selectUser,
} from "../store/useAuthStore";

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

// ✅ Add new item (with Firestore + LocalStorage)
export const addNewItem = async (item) => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  const newItem = await createItem(item, user.uid);

  const localItems = getItemsFromLocal();
  localItems.push(newItem);
  saveItemsToLocal(localItems);

  return newItem;
};

// ✅ Fetch items
export const fetchItems = async (skipLocalSearch = false) => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  if (skipLocalSearch) {
    return fetchItemsFromCloud(user);
  }

  let localItems = getItemsFromLocal().filter(
    (item) => item.userId === user.uid
  );

  if (localItems.length > 0) {
    return localItems;
  }

  return fetchItemsFromCloud(user);
};

export const fetchItemsFromCloud = async (user) => {
  const firestoreItems = await getItems(user.uid); // ✅ Firestore query
  saveItemsToLocal(firestoreItems);

  return firestoreItems;
};

// ✅ Update item
export const updateExistingItem = async (id, updatedData) => {
  const state = useAuthStore.getState();
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  await updateItem(id, updatedData);

  let localItems = getItemsFromLocal();
  localItems = localItems.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  saveItemsToLocal(localItems);
};

// ✅ Delete item
export const deleteExistingItem = async (id) => {
  const state = useAuthStore.getState();
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  await deleteItem(id);

  let localItems = getItemsFromLocal();
  localItems = localItems.filter((item) => item.id !== id);
  saveItemsToLocal(localItems);
};

// ✅ Clear LocalStorage (optional)
export const clearLocalItems = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const downloadItemsAsJSON = async () => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  // 1. Fetch the data
  const items = await fetchItemsFromCloud(user);

  
  // 2. Convert data to a JSON string
  const jsonString = JSON.stringify(items, null, 2);
  
  // 3. Create a Blob and a temporary URL
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  // 4. Create a hidden link and trigger click
  const link = document.createElement("a");
  link.href = url;
  link.download = `emprog-watchlist-${new Date().toISOString().split("T")[0]}.json`;
  
  document.body.appendChild(link);
  link.click();

  // 5. Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
