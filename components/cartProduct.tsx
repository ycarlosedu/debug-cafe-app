import { FontAwesome } from '@expo/vector-icons';
import { Text, View, ViewProps } from 'react-native';

import { Button } from './button';

import { ProductInCart } from '@/models/product';
import useCartStore from '@/stores/useCartStore';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

type Props = ViewProps & {
  product: ProductInCart;
};

export default function CartProduct({ product, ...props }: Props) {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useCartStore();

  const handleDecrement = (id: ProductInCart['id']) => {
    if (product.quantity === 1) {
      return removeProduct(id);
    }

    decreaseProductQuantity(id);
  };

  return (
    <View
      className="w-full flex-row items-center justify-between gap-3 rounded-lg border-2 border-beige px-4 py-3"
      {...props}>
      <Text className="text-lg text-beige">{format.truncate(product.name, 20)}</Text>
      <View className="flex-row items-center gap-3">
        <Text className="text-lg text-beige">
          {format.toBrazillianCurrency(product.price * product.quantity)}
        </Text>
        <View className="flex-row items-center justify-center overflow-hidden rounded-full bg-beige">
          <Button size="icon" className="rounded-none" onPress={() => handleDecrement(product.id)}>
            <FontAwesome name="minus" size={20} color={colors.brown} />
          </Button>
          <Text className="bg-beige text-2xl text-brown">{product.quantity}</Text>
          <Button
            size="icon"
            className="rounded-none"
            onPress={() => increaseProductQuantity(product.id)}>
            <FontAwesome name="plus" size={20} color={colors.brown} />
          </Button>
        </View>
      </View>
    </View>
  );
}
