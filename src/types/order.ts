import type { OrderItem } from './orderItem';
import type { TaxBreakdown } from './taxBreakdown';

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'Successful' | 'Pending' | 'Failed';
  latitude: string;
  longitude: string;
  subTotal: number;
  taxAmount: number;
  compositeTaxRate: number;
  totalAmount: number;
  taxes: TaxBreakdown;
  createdAt: string;
}
