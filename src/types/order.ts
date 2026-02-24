import type { Kit } from './kit';
import type { TaxBreakdown } from './taxBreakdown';

export interface Order {
  id: string;
  userId: string;
  checkout: Kit[];
  subTotal: number;
  status: 'received' | 'pending' | 'cancelled';
  latitude: string;
  longitude: string;
  taxesBreakdown: TaxBreakdown;
  timestamp: string;
}
