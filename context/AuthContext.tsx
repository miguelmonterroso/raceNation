import { create } from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string;
  instagram: string;
  tiktok: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

const zustandLocalStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) =>
        set({
          user,
          token,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
        }),
      initializeAuth: () => {
        const token = get().token;
        if (token) {
          try {
            const decodedToken = jwtDecode<User>(token);
            set({ user: decodedToken, token });
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
      },
    }),
    {
      name: "auth-store",
      storage: zustandLocalStorage,
    }
  )
);
