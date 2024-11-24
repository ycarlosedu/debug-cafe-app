import { Order } from '@/models/order';
import { request } from '@/utils/request';

type GetMyOrdersResponse = Order[];
const getAll = async (): Promise<GetMyOrdersResponse> => {
  return request.get(`/orders/me`);
};

type CreateOrderBody = {
  addressId: string;
  paymentMethod: string;
  products: { id: string; quantity: number }[];
};
type CreateOrderResponse = {
  order: Order;
  message: string;
};
const create = async (data: CreateOrderBody): Promise<CreateOrderResponse> => {
  return request.post(`/orders`, data);
};

export const myOrders = {
  getAll,
  create,
};
