
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  setUser: (user: User | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthModalOpen: false,
  setUser: (user) => set({ user }),
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract username from email (part before @)
    const username = email.split('@')[0];
    
    const user = { id: '1', name: username, email };
    set({ user, isAuthModalOpen: false });
    return true;
  },
  register: async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = { id: '1', name, email };
    set({ user, isAuthModalOpen: false });
    return true;
  },
  logout: () => set({ user: null })
}));
