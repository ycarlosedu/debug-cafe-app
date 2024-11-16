import { Product } from './product';

import { ORDER_STATUS } from '@/constants';

export type Order = {
  id: number;
  date: string;
  status: ORDER_STATUS;
  products: Product[];
  stars?: number;
  totalPrice: number;
  paymentMethod: string;
  deliveryAddress: string;
};
