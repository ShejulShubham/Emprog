import { 
  createWatchlistItem, 
  getWatchlistItems, 
  updateWatchlistItem, 
  deleteWatchlistItem 
} from "../firebase/watchlist"; // ✅ Pointing to the new file
import useAuthStore, {
  selectIsLoggedIn,
  selectUser,
} from "../store/useAuthStore";

const LOCAL_STORAGE_KEY = "watchlist";

// ✅ Save items to LocalStorage
export const saveItemsToLocal = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// ✅ Get items from LocalStorage
export const getItemsFromLocal = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// ✅ Add new item
export const addNewItem = async (item) => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  const newItem = await createWatchlistItem(item, user.uid);

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

  let localItems = getItemsFromLocal();

  if (localItems.length > 0) {
    return localItems;
  }

  return fetchItemsFromCloud(user);
};

export const fetchItemsFromCloud = async (user) => {
  const firestoreItems = await getWatchlistItems(user.uid); 
  saveItemsToLocal(firestoreItems);

  return firestoreItems;
};

// ✅ Update item
export const updateExistingItem = async (id, updatedData) => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  await updateWatchlistItem(user.uid, id, updatedData);

  let localItems = getItemsFromLocal();
  localItems = localItems.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  saveItemsToLocal(localItems);
};

// ✅ Delete item
export const deleteExistingItem = async (id) => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");
  
  await deleteWatchlistItem(user.uid, id);

  let localItems = getItemsFromLocal();
  localItems = localItems.filter((item) => item.id !== id);
  saveItemsToLocal(localItems);
};

// ✅ Clear LocalStorage
export const clearLocalItems = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

// ✅ Download JSON
export const downloadItemsAsJSON = async () => {
  const state = useAuthStore.getState();
  const user = selectUser(state);
  const isLoggedIn = selectIsLoggedIn(state);

  if (!isLoggedIn) throw new Error("User not authenticated");

  const items = await fetchItemsFromCloud(user);
  const jsonString = JSON.stringify(items, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `emprog-watchlist-${new Date().toISOString().split("T")[0]}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};