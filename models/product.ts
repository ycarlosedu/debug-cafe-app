import { PRODUCT_CATEGORY } from '@/constants';

export type Product = {
  id: number;
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
  id: number;
  name: PRODUCT_CATEGORY;
  image: any;
};
