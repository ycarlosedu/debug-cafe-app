import { Product } from '@/models/product';
import { request } from '@/utils/request';

type GetAllProductsResponse = Product[];
const getAll = async (): Promise<GetAllProductsResponse> => {
  return request.get('/product');
};

export const products = {
  getAll,
};
