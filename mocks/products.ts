import { PRODUCT_CATEGORY } from '@/constants';
import { Product } from '@/models/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Brownie',
    image: require('@/assets/images/products/brownie.png'),
    price: 5.0,
    description:
      'Uma deliciosa sobremesa. Feito com chocolate e nozes. Uma delícia! Feito com os mais puros ingredientes. Uma experiência única. Experimente! Não irá se arrepender. Temos certeza que você vai adorar. Aproveite!',
    categories: [PRODUCT_CATEGORY.SWEET_STUFF],
  },
  {
    id: 2,
    name: 'Café Expresso',
    image: require('@/assets/images/products/espresso.png'),
    price: 3.5,
    description: 'Um café forte e saboroso para começar o dia.',
    categories: [
      PRODUCT_CATEGORY.HOT_COFFEES,
      PRODUCT_CATEGORY.ICED_COFFEES,
      PRODUCT_CATEGORY.SWEET_STUFF,
    ],
  },
  {
    id: 3,
    name: 'Café com Leite',
    image: require('@/assets/images/products/coffe-with-milk.png'),
    price: 4.5,
    description: 'Um café suave e cremoso para o seu dia.',
    categories: [PRODUCT_CATEGORY.HOT_COFFEES],
  },
  {
    id: 4,
    name: 'Cappuccino',
    image: require('@/assets/images/products/cappuccino.png'),
    price: 6.0,
    description: 'Um café com leite e espuma de leite.',
    categories: [PRODUCT_CATEGORY.HOT_COFFEES],
  },
  {
    id: 5,
    name: 'Chocolate Quente',
    image: require('@/assets/images/products/hot-chocolate.png'),
    price: 7.0,
    description: 'Um chocolate quente e cremoso.',
    categories: [PRODUCT_CATEGORY.HOT_COFFEES],
  },
  {
    id: 6,
    name: 'Pão de Queijo',
    image: require('@/assets/images/products/cheese-bread.png'),
    price: 3.0,
    description: 'Um pão de queijo quentinho.',
    categories: [PRODUCT_CATEGORY.SALTY_SNACKS],
  },
  {
    id: 7,
    name: 'Risolis de Frango',
    image: require('@/assets/images/products/chicken-risoles.png'),
    price: 4.0,
    description: 'Um salgado crocante e saboroso.',
    categories: [PRODUCT_CATEGORY.SALTY_SNACKS],
  },
  {
    id: 8,
    name: 'Suco de Laranja',
    image: require('@/assets/images/products/orange-juice.png'),
    price: 5.0,
    description: 'Um suco natural e refrescante.',
    categories: [PRODUCT_CATEGORY.DRINKS],
  },
];
