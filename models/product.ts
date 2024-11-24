import { PRODUCT_CATEGORY } from '@/constants';

export type Product = {
  id: string;
  name: string;
  image: any;
  price: number;
  description: string;
  categories: PRODUCT_CATEGORY[];
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
