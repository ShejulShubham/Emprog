import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSettings = create(
  persist(
    (set) => ({
      settings: {
        darkMode: false,
        directToDashboard: false,
      },
      updateSetting: (key, value) =>
        set((state) => ({
          settings: { ...state.settings, [key]: value },
        })),
      resetSettings: () => set({ settings: {} }),
    }),
    {
      name: "user-settings", // key in localStorage
    }
  )
);
