import { ORDER_STATUS } from '@/constants';
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

const getPendingOrders = async (): Promise<GetMyOrdersResponse> => {
  return request.get(`/orders/pending`);
};

const getPendingOrder = async (id: string): Promise<GetMyOrderResponse> => {
  return request.get(`/orders/pending/${id}`);
};

type UpdateOrderStatusResponse = {
  status: ORDER_STATUS;
  message: string;
};
const updateOrderStatus = async (id: string): Promise<UpdateOrderStatusResponse> => {
  return request.patch(`/orders/pending/${id}`);
};

const cancelOrder = async (id: string): Promise<UpdateOrderStatusResponse> => {
  return request.delete(`/orders/pending/${id}`);
};

export const teamOrders = {
  getPendingOrders,
  getPendingOrder,
  updateOrderStatus,
  cancelOrder,
};
