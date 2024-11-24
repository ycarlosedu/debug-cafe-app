import { Product } from '@/models/product';
import { request } from '@/utils/request';

type GetAllProductsResponse = Product[];
const getAll = async (): Promise<GetAllProductsResponse> => {
  return request.get('/products');
};

type GetOneProductsResponse = Product;
const getOne = async (id: string): Promise<GetOneProductsResponse> => {
  return request.get(`/products/${id}`);
};

export const products = {
  getAll,
  getOne,
};
