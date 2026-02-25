import type { Kit } from '@/types/kit';
import { api } from './authAxiosInstance';

interface KitResponse {
  items: Kit[];
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface GetKitsParams {
  Page: number;
  SearchTerm: string;
}

export class KitService {
  private static instance: KitService;

  constructor() {
    if (KitService.instance) {
      return KitService.instance;
    }
    KitService.instance = this;
  }

  async getKits(params?: Partial<GetKitsParams>): Promise<KitResponse> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (!value) return;
        queryParams.set(key, value.toString());
      });
    }

    const { data } = await api.get<KitResponse>(
      `/Kit?${queryParams.toString()}`
    );
    return data;
  }

  async getKit(id: string): Promise<Kit> {
    const { data: kit } = await api.get<Kit>(`/Kit/${id}`);
    return kit;
  }
}
