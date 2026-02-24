import type { Order } from './order';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  orders: Order[];
  isAdmin: boolean;
  accessToken: string;
}
