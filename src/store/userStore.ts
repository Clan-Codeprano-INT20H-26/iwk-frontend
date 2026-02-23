import { create } from 'zustand';
import { AuthService } from '@/api/authService';
import type { User } from '@/types/user';

const authService = new AuthService();

interface UserState {
  user: User | null;
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
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  setUser: (user: User) => {
    set({ user });
  },

  login: async (email: string, password: string) => {
    const user = await authService.login(email, password);
    set({ user });
  },

  register: async (email: string, password: string, username: string) => {
    const user = await authService.register(email, password, username);
    set({ user });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null });
  },
}));
