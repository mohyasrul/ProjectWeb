import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  avatar?: string;
}

interface AuthError {
  message: string;
  field?: string;
}

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  error: AuthError | null;
  setUser: (user: User | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  setError: (error: AuthError | null) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => void;
}

// Simulate database with localStorage
const USERS_KEY = "hotel_users_db";

const getUsers = (): Array<User & { password: string }> => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveUsers = (users: Array<User & { password: string }>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthModalOpen: false,
      error: null,

      setUser: (user) => set({ user }),
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open, error: null }),
      setError: (error) => set({ error }),

      checkAuth: () => {
        // Check if user is still valid on app start
        const { user } = get();
        if (user) {
          const users = getUsers();
          const existingUser = users.find((u) => u.id === user.id);
          if (!existingUser) {
            set({ user: null });
          }
        }
      },

      login: async (email, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const users = getUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
          return { success: false, error: "Email tidak terdaftar" };
        }

        if (user.password !== password) {
          return { success: false, error: "Password salah" };
        }

        const { password: _, ...userWithoutPassword } = user;
        set({
          user: userWithoutPassword,
          isAuthModalOpen: false,
          error: null,
        });

        return { success: true };
      },

      register: async (name, email, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const users = getUsers();

        // Check if email already exists
        if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: "Email sudah terdaftar" };
        }

        const newUser = {
          id: generateId(),
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          registeredAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveUsers(users);

        const { password: _, ...userWithoutPassword } = newUser;
        set({
          user: userWithoutPassword,
          isAuthModalOpen: false,
          error: null,
        });

        return { success: true };
      },

      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "hotel-auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
