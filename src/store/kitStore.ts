import { create } from 'zustand';
import { KitService } from '@/api/kitService';
import type { Kit } from '@/types/kit';

const kitService = new KitService();

interface KitState {
  kits: Kit[];
  getKits: () => Promise<Kit[]>;
  getKit: (id: string) => Promise<Kit | null>;
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
      return items;
    } catch (error) {
      console.error(error);
      return [];
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
      console.error(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
