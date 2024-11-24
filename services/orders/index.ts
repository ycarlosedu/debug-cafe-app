import { DetailedOrder, Order } from '@/models/order';
import { request } from '@/utils/request';

type GetMyOrdersResponse = Order[];
const getAll = async (): Promise<GetMyOrdersResponse> => {
  return request.get(`/orders`);
};

type GetMyOrderResponse = DetailedOrder;
const getOne = async (id: string): Promise<GetMyOrderResponse> => {
  return request.get(`/orders/${id}`);
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
  getOne,
  create,
};
