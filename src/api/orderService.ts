import type { Order } from '@/types/order';
import { api } from './authAxiosInstance';
import type { Coordinates } from '@/types/coordinates';
import type { PaginatedResponse } from '@/types/paginatedResponse';

export interface IntentKit {
  kitId: string;
  quantity: number;
}

interface CreateIntentBody {
  items: IntentKit[];
}

type CreateOrderBody = CreateIntentBody & Coordinates;

interface IntentResponse {
  clientSecret: string;
  totalAmount: number;
}

export interface GetOrdersParams {
  PageNumber: number;
  PageSize: number;
  FromDate: string;
  ToDate: string;
  MinPrice: number;
  MaxPrice: number;
  SortBy: string;
  IsDescending: boolean;
}

export class OrderService {
  private static instance: OrderService;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }
    OrderService.instance = this;
  }

  async getOrders(
    params?: Partial<GetOrdersParams>
  ): Promise<PaginatedResponse<Order>> {
    const { data } = await api.get<PaginatedResponse<Order>>('/Order', {
      params,
    });
    return data;
  }

  async createOrder(order: CreateOrderBody): Promise<Order> {
    const { data } = await api.post<Order>('/Order', order);
    return data;
  }

  async calculateTax(params: Coordinates): Promise<number> {
    const { data } = await api.get<number>('/Tax', { params });
    return data;
  }

  async createIntent(order: CreateIntentBody): Promise<IntentResponse> {
    const { data } = await api.post<IntentResponse>(
      `/Payment/create-intent`,
      order
    );
    return data;
  }

  async uploadCSV(formData: FormData) {
    await api.post('/Order/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
