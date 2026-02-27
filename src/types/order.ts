import type { Kit } from './kit';
import type { TaxBreakdown } from './taxBreakdown';

export type Status = 'Successful' | 'Pending' | 'Failed';
interface OrderItem {
  kit: Kit;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: Status;
  latitude: string;
  longitude: string;
  subTotal: number;
  taxAmount: number;
  compositeTaxRate: number;
  totalAmount: number;
  taxes: TaxBreakdown;
  createdAt: string;
}
