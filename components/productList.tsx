import { FontAwesome } from '@expo/vector-icons';
import { ImageBackground, ScrollView, Text, View, ViewProps } from 'react-native';

import { Button } from './button';

import { products } from '@/mocks/products';
import { format } from '@/utils/format';

type Props = ViewProps & {
  title: string;
};

export default function ProductList({ title, ...props }: Props) {
  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">{title}</Text>
      <ScrollView horizontal className="grow-0 px-4 pb-2">
        {products.map((product) => (
          <View key={product.id} className="mr-4 gap-2 rounded-xl bg-beige p-3">
            <View className="overflow-hidden rounded-lg border-2 border-brown">
              <ImageBackground
                source={product.image}
                className="relative object-contain"
                style={{ width: 240, height: 150 }}>
                <Text className="absolute bottom-3 left-3 w-fit rounded-lg bg-black/50 px-2 py-1 text-xl text-white">
                  {format.toBrazillianCurrency(product.price)}
                </Text>
                <Button size="icon" className="absolute bottom-3 right-3">
                  <FontAwesome size={24} name="cart-plus" />
                </Button>
              </ImageBackground>
            </View>
            <Text className="text-xl text-brown">{product.name}</Text>
            <Text className="text-sm text-white">{product.shortDescription}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
