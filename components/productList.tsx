import { Image, ScrollView, Text, View } from 'react-native';

import { products } from '@/mocks/products';

export default function ProductList() {
  return (
    <View className="gap-4">
      <Text className="pl-4 text-lg font-medium text-beige">Café da manhã</Text>
      <ScrollView horizontal className="grow-0 px-4 pb-2">
        {products.map((product) => (
          <View key={product.id} className="mr-4 gap-2 rounded-xl bg-beige p-2">
            <Image
              source={product.image}
              className="rounded-lg border-2 border-brown object-contain"
              style={{ width: 240, height: 150 }}
            />
            <Text className="text-xl text-brown">{product.name}</Text>
            <Text className="text-sm text-white">{product.shortDescription}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
