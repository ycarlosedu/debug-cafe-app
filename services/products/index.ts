import { Product } from '@/models/product';
import { request } from '@/utils/request';

type GetAllProductsResponse = Product[];
const getAll = async (): Promise<GetAllProductsResponse> => {
  return request.get('/product');
};

type GetOneProductsResponse = Product;
const getOne = async (id: string): Promise<GetOneProductsResponse> => {
  return request.get(`/product/${id}`);
};

export const products = {
  getAll,
  getOne,
};
