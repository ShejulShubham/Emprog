import { create } from "zustand";

const useItemStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
}));

export default useItemStore;
