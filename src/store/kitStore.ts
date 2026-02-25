import { create } from 'zustand';
import { KitService, type GetKitsParams } from '@/api/kitService';
import type { Kit } from '@/types/kit';

const kitService = new KitService();

interface KitState {
  kits: Kit[];
  setKits: (kits: Kit[]) => void;
  getKits: (params?: Partial<GetKitsParams>) => Promise<void>;
  getKit: (id: string) => Promise<Kit>;
  isLoading: boolean;
}

const initialState = {
  kits: [],
  isLoading: false,
};

export const useKitStore = create<KitState>((set) => ({
  ...initialState,

  setKits: (kits: Kit[]) => {
    set({ kits });
  },

  getKits: async (params?: Partial<GetKitsParams>) => {
    set({ isLoading: true });
    try {
      const { items } = await kitService.getKits(params);
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
