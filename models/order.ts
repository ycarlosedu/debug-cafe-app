import { ProductInOrder } from './product';

import { FeedbackValues } from '@/app/(internal)/order-feedback/[id]';
import { ORDER_STATUS } from '@/constants';

export type Order = {
  id: string;
  createdAt: string;
  status: ORDER_STATUS;
  totalPrice: number;
  paymentMethod: string;
  address: {
    street: string;
    number: string;
  };
  feedback?: FeedbackValues;
};

export type DetailedOrder = Order & {
  products: ProductInOrder[];
};
