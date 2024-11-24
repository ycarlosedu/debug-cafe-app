import { Product, ProductCategory } from '@/models/product';
import { request } from '@/utils/request';

type GetAllCategoriesResponse = ProductCategory[];
const getAll = async (): Promise<GetAllCategoriesResponse> => {
  return request.get('/category');
};

type GetOneCategoryResponse = ProductCategory & {
  products: Product[];
};
const getOne = async (categoryId: string): Promise<GetOneCategoryResponse> => {
  return request.get('/category/' + categoryId);
};

export const categories = {
  getAll,
  getOne,
};
