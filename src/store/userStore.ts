import { create } from 'zustand';
import { UserService } from '@/api/userService';
import type { User } from '@/types/user';
import { setCookie } from '@/lib/utils/setCookie';

const userService = new UserService();

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  getProfile: () => Promise<User | null>;
  login: (
    email: string,
    password: string,
    isRememberMe: boolean
  ) => Promise<User | null>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<User | null>;
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

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const user = await userService.getUser();
      set({ user });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string, isRememberMe: boolean) => {
    set({ isLoading: true });
    try {
      const user = await userService.login(email, password, isRememberMe);
      set({ user });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true });
    try {
      const user = await userService.register(email, password, username);
      set({ user });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    setCookie('token', '');
    set({ user: null });
  },
}));
