import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),

    {
      name: "authStore",
    },
  ),
);

export default authStore;
