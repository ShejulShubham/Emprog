import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { uid, email, displayName, photoURL }
      error: null,

      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "auth-storage", // Key in localStorage
      getStorage: () => localStorage,
    }
  )
);

// ✅ Selector helper functions
export const selectUser = (state) => state.user;
export const selectIsLoggedIn = (state) => !!state.user;

export default useAuthStore;
