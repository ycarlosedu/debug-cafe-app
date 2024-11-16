import { create } from 'zustand';

import { Product, ProductInCart } from '@/models/product';

const initialState = {
  products: [] as ProductInCart[],
};

type InitialState = typeof initialState;

type Store = InitialState & {
  addProduct: (product: Product) => void;
  removeProduct: (id: ProductInCart['id']) => void;
  increaseProductQuantity: (id: ProductInCart['id']) => void;
  decreaseProductQuantity: (id: ProductInCart['id']) => void;
  reset: () => void;
};

const useCartStore = create<Store>()((set, get) => ({
  ...initialState,
  addProduct: (product) => {
    const newProducts = [...get().products, { ...product, quantity: 1 }];
    set({
      products: newProducts,
    });
  },
  removeProduct: (id) => {
    const newProducts = get().products.filter((product) => product.id !== id);
    set({
      products: newProducts,
    });
  },
  increaseProductQuantity: (id) => {
    const newProducts = get().products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
        };
      }
      return product;
    });
    set({
      products: newProducts,
    });
  },
  decreaseProductQuantity: (id) => {
    const newProducts = get().products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 2) - 1,
        };
      }
      return product;
    });
    set({
      products: newProducts,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useCartStore;
