import { create } from 'zustand';
import { KitService } from '@/api/kitService';
import type { Kit } from '@/types/kit';

const kitService = new KitService();

interface KitState {
  kits: Kit[];
  getKits: () => Promise<void>;
  getKit: (id: string) => Promise<Kit>;
  isLoading: boolean;
}

const initialState = {
  kits: [],
  isLoading: false,
};

export const useKitStore = create<KitState>((set) => ({
  ...initialState,

  getKits: async () => {
    set({ isLoading: true });
    try {
      const { items } = await kitService.getKits();
      set({ kits: items });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getKit: async (id: string) => {
    set({ isLoading: true });
    try {
      const kit = await kitService.getKit(id);
      return kit;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
