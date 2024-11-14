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
    totalPrice: 100,
    paymentMethod: 'Cartão Visa 6040',
    deliveryAddress: 'Rua Santo Alfredo, nº 123',
  },
  {
    id: 2,
    date: '13/11/2024 09:27',
    status: ORDER_STATUS.ON_THE_WAY,
    products: productsList,
    stars: undefined,
    totalPrice: 65.5,
    paymentMethod: 'Pix',
    deliveryAddress: 'Rua Santo Teste',
  },
  {
    id: 3,
    date: '13/11/2024 09:27',
    status: ORDER_STATUS.IN_PREPARATION,
    products: productsList,
    stars: undefined,
    totalPrice: 32.95,
    paymentMethod: 'Cartão Master 1234',
    deliveryAddress: 'Rua Santo 1234',
  },
  {
    id: 4,
    date: '12/11/2024 09:27',
    status: ORDER_STATUS.PENDING,
    products: productsList,
    stars: undefined,
    totalPrice: 1095.2,
    paymentMethod: 'Cartão Elo 9999',
    deliveryAddress: 'Rua Santo 9451321',
  },
  {
    id: 5,
    date: '11/11/2024 09:27',
    status: ORDER_STATUS.CANCELED,
    products: productsList,
    stars: undefined,
    totalPrice: 53254.52,
    paymentMethod: 'Cartão Visa 0000',
    deliveryAddress: 'Rua Avenida 123',
  },
];
