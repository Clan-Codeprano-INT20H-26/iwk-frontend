import type { Order } from '@/types/order';
import { api } from './authAxiosInstance';
import type { Coordinates } from '@/types/coordinates';

export interface OrderKit {
  id: string;
  quantity: number;
}

interface OrderBody extends Coordinates {
  kitId: OrderKit[];
}

interface GetOrdersParams {
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

  async getOrders(params?: Partial<GetOrdersParams>): Promise<Order[]> {
    const { data } = await api.get<Order[]>('/Order', { params });
    return data;
  }

  async createOrder(order: OrderBody): Promise<Order> {
    const { data } = await api.post<Order>('/Order', order);
    return data;
  }

  async calculateTax(params: Coordinates): Promise<number> {
    const { data } = await api.get<number>('/Tax', { params });
    return data;
  }
}
