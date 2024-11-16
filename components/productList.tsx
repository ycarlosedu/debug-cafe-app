import { ScrollView, Text, View, ViewProps } from 'react-native';

import ProductCard from './productCard';

import { products } from '@/mocks/products';

type Props = ViewProps & {
  title: string;
};

export default function ProductList({ title, ...props }: Props) {
  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">{title}</Text>
      <ScrollView horizontal className="grow-0 px-4 pb-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
}
