import { ProductInCart } from './product';

import { ORDER_STATUS } from '@/constants';

type Feedback = {
  comment: string;
  stars: number;
};

export type Order = {
  id: number;
  date: string;
  status: ORDER_STATUS;
  products: ProductInCart[];
  totalPrice: number;
  paymentMethod: string;
  deliveryAddress: string;
  feedback?: Feedback;
  deliveryFeedback?: Feedback;
};
