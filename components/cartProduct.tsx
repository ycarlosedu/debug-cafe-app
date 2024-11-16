import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View, ViewProps } from 'react-native';

import { Button } from './button';

import { Product } from '@/models/product';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

type Props = ViewProps & {
  product: Product;
};

export default function CartProduct({ product, ...props }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevState) => prevState - 1);
  };

  return (
    <View
      className="w-full flex-row items-center justify-between gap-3 rounded-lg border-2 border-beige px-4 py-3"
      {...props}>
      <Text className="text-lg text-beige">{format.truncate(product.name, 20)}</Text>
      <View className="flex-row items-center gap-3">
        <Text className="text-lg text-beige">
          {format.toBrazillianCurrency(product.price * quantity)}
        </Text>
        <View className="flex-row items-center justify-center overflow-hidden rounded-full bg-beige">
          <Button
            size="icon"
            className="rounded-none"
            onPress={handleDecrement}
            disabled={quantity === 1}>
            <FontAwesome name="minus" size={20} color={colors.brown} />
          </Button>
          <Text className="bg-beige text-2xl text-brown">{quantity}</Text>
          <Button size="icon" className="rounded-none" onPress={handleIncrement}>
            <FontAwesome name="plus" size={20} color={colors.brown} />
          </Button>
        </View>
      </View>
    </View>
  );
}
