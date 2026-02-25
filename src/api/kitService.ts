import type { Kit } from '@/types/kit';
import { api } from './authAxiosInstance';

interface KitResponse {
  items: Kit[];
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export class KitService {
  private static instance: KitService;

  constructor() {
    if (KitService.instance) {
      return KitService.instance;
    }
    KitService.instance = this;
  }

  async getKits(): Promise<KitResponse> {
    const { data } = await api.get<KitResponse>('/Kit');
    return data;
  }

  async getKit(id: string): Promise<Kit> {
    const { data: kit } = await api.get<Kit>(`/Kit/${id}`);
    return kit;
  }
}
