import { create } from 'zustand';
import { UserService } from '@/api/userService';
import type { User } from '@/types/user';
import { setCookie } from '@/lib/utils/setCookie';

const userService = new UserService();

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  getProfile: () => Promise<void>;
  login: (
    email: string,
    password: string,
    isRememberMe: boolean
  ) => Promise<void>;
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

  setUser: (user: User | null) => {
    set({ user });
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const user = await userService.getUser();
      set({ user });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string, isRememberMe: boolean) => {
    set({ isLoading: true });
    try {
      const user = await userService.login(email, password, isRememberMe);
      set({ user });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true });
    try {
      const user = await userService.register(email, password, username);
      set({ user });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    setCookie('token', '', 0);
    set({ user: null });
  },
}));
