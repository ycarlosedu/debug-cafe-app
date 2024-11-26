import { Product, ProductCategory } from '@/models/product';
import { AddCategoryValues } from '@/schemas';
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

type AddCategoryResponse = {
  category: ProductCategory;
  message: string;
};
const addCategory = async (category: AddCategoryValues): Promise<AddCategoryResponse> => {
  return request.post('/categories', category);
};

export const categories = {
  getAll,
  getOne,
  addCategory,
};
