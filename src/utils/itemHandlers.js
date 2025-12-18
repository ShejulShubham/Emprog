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

  if(skipLocalSearch){
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
