import { products } from './products';

import { ORDER_STATUS } from '@/constants';

const productsList = [
  {
    ...products[0],
    quantity: 1,
  },
  {
    ...products[1],
    quantity: 2,
  },
  {
    ...products[2],
    quantity: 1,
  },
  {
    ...products[3],
    quantity: 3,
  },
];

export const orders = [
  {
    id: 1,
    date: '14/11/2024 09:27',
    status: ORDER_STATUS.DELIVERED,
    products: productsList,
    stars: 5,
  },
  {
    id: 2,
    date: '13/11/2024 09:27',
    status: ORDER_STATUS.ON_THE_WAY,
    products: productsList,
    stars: 4,
  },
  {
    id: 3,
    date: '13/11/2024 09:27',
    status: ORDER_STATUS.IN_PREPARATION,
    products: productsList,
    stars: 3,
  },
  {
    id: 4,
    date: '12/11/2024 09:27',
    status: ORDER_STATUS.PENDING,
    products: productsList,
    stars: undefined,
  },
  {
    id: 5,
    date: '11/11/2024 09:27',
    status: ORDER_STATUS.CANCELED,
    products: productsList,
    stars: undefined,
  },
];
