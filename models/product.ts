import { PRODUCT_CATEGORY } from '@/constants';

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  categories: ProductCategory[];
  createdAt: string;
  updatedAt: string;
};

export type ProductInCart = Product & {
  quantity: number;
};

export type ProductCategory = {
  id: string;
  name: PRODUCT_CATEGORY;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductInOrder = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
