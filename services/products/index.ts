import { SearchProductValues } from '@/app/(home)/search';
import { Product } from '@/models/product';
import { AddProductValues } from '@/schemas';
import { request } from '@/utils/request';

type GetAllProductsResponse = Product[];
const getAll = async (): Promise<GetAllProductsResponse> => {
  return request.get('/products');
};

type GetOneProductsResponse = Product;
const getOne = async (id: string): Promise<GetOneProductsResponse> => {
  return request.get(`/products/${id}`);
};

const search = async (values: SearchProductValues): Promise<GetAllProductsResponse> => {
  return request.post(`/products/search`, values);
};

type AddProductResponse = {
  product: Product;
  message: string;
};
const addProduct = async (values: AddProductValues): Promise<AddProductResponse> => {
  return request.post(`/products`, values);
};

type EditProductBody = AddProductValues & {
  id: string;
};
const editProduct = async (values: EditProductBody): Promise<AddProductResponse> => {
  return request.put(`/products`, values);
};

export const products = {
  getAll,
  getOne,
  search,
  addProduct,
  editProduct,
};
