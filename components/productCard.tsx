import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ImageBackground, Pressable, PressableProps, Text, View } from 'react-native';

import { Button } from './button';

import { Product } from '@/models/product';
import useCartStore from '@/stores/useCartStore';
import { format } from '@/utils/format';

type Props = PressableProps & {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addProduct, removeProduct, products } = useCartStore();

  const productIsInCart = Boolean(products.find((p) => p.id === product.id));

  const handleClickProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Pressable
      onPress={() => handleClickProduct(product.id.toString())}
      className="mr-4 w-[265px] gap-2 rounded-xl bg-beige p-3">
      <View className="overflow-hidden rounded-lg border-2 border-brown">
        <ImageBackground
          source={product.image}
          className="relative object-contain"
          style={{ width: 240, height: 150 }}>
          <Text className="absolute bottom-3 left-3 w-fit rounded-lg bg-black/50 px-2 py-1 text-xl text-white">
            {format.toBrazillianCurrency(product.price)}
          </Text>
          <Button
            size="icon"
            onPress={() => (productIsInCart ? removeProduct(product.id) : addProduct(product))}
            className="absolute bottom-3 right-3">
            <FontAwesome size={24} name={productIsInCart ? 'trash' : 'cart-plus'} />
          </Button>
        </ImageBackground>
      </View>
      <Text className="text-xl text-brown">{product.name}</Text>
      <Text className="break-all text-sm text-white">
        {format.truncate(product.description, 90)}
      </Text>
    </Pressable>
  );
}
