import type { Kit } from '@/types/kit';
import { api } from './authAxiosInstance';
import type { PaginatedResponse } from '@/types/paginatedResponse';
import type { KitSortCriteria } from '@/types/kitSortCriteria';

export interface GetKitsParams {
  PageNumber: number;
  SearchTerm: string;
  SortBy: KitSortCriteria;
  IsDescending: boolean;
}

export class KitService {
  private static instance: KitService;

  constructor() {
    if (KitService.instance) {
      return KitService.instance;
    }
    KitService.instance = this;
  }

  async getKits(
    params?: Partial<GetKitsParams>
  ): Promise<PaginatedResponse<Kit>> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) return;
        queryParams.set(key, value.toString());
      });
    }

    const { data } = await api.get<PaginatedResponse<Kit>>(
      `/Kit?${queryParams.toString()}`
    );
    return data;
  }

  async getKit(id: string): Promise<Kit> {
    const { data: kit } = await api.get<Kit>(`/Kit/${id}`);
    return kit;
  }
}
