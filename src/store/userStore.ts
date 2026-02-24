import { create } from 'zustand';
import { AuthService } from '@/api/authService';
import type { User } from '@/types/user';

const authService = new AuthService();

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState = {
  user: null,
  isLoading: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  setUser: (user: User) => {
    set({ user });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const user = await authService.login(email, password);
      set({ user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true });
    try {
      const user = await authService.register(email, password, username);
      set({ user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ user: null });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
