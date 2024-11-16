import { PRODUCT_CATEGORY } from '@/constants';
import { ProductCategory } from '@/models/product';

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: PRODUCT_CATEGORY.HOT_COFFEES,
    image: require('@/assets/images/categories/hot-coffees.png'),
  },
  {
    id: 2,
    name: PRODUCT_CATEGORY.ICED_COFFEES,
    image: require('@/assets/images/categories/iced-coffees.png'),
  },
  {
    id: 3,
    name: PRODUCT_CATEGORY.SWEET_STUFF,
    image: require('@/assets/images/categories/sweet-stuff.png'),
  },
  {
    id: 4,
    name: PRODUCT_CATEGORY.SALTY_SNACKS,
    image: require('@/assets/images/categories/salty-snacks.png'),
  },
  {
    id: 5,
    name: PRODUCT_CATEGORY.DRINKS,
    image: require('@/assets/images/categories/drinks.png'),
  },
  {
    id: 6,
    name: PRODUCT_CATEGORY.COMBOS,
    image: require('@/assets/images/categories/combo.png'),
  },
];
