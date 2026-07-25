import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),
      logout: () => set({ user: null}),
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
