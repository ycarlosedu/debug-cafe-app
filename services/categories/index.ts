import { ProductCategory } from '@/models/product';
import { request } from '@/utils/request';

type GetAllCategoriesResponse = ProductCategory[];
const getAll = async (): Promise<GetAllCategoriesResponse> => {
  return request.get('/category');
};

export const categories = {
  getAll,
};
