import { ProductInOrder } from './product';

import { ORDER_STATUS } from '@/constants';

type Feedback = {
  comment: string;
  stars: number;
};

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
  feedback?: Feedback;
  deliveryFeedback?: Feedback;
};

export type DetailedOrder = Order & {
  products: ProductInOrder[];
};
