import { Product, ProductCategory } from '@/models/product';
import { request } from '@/utils/request';

type GetAllCategoriesResponse = ProductCategory[];
const getAll = async (): Promise<GetAllCategoriesResponse> => {
  return request.get('/categories');
};

type GetOneCategoryResponse = ProductCategory & {
  products: Product[];
};
const getOne = async (categoryId: string): Promise<GetOneCategoryResponse> => {
  return request.get('/categories/' + categoryId);
};

export const categories = {
  getAll,
  getOne,
};
