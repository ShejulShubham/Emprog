import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setLoading: (status) => set({ loading: status }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
