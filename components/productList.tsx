import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, View, ViewProps } from 'react-native';

import ProductCard from './productCard';

import { categories } from '@/services/categories';

type Props = ViewProps & {
  categoryId: string;
};

export default function ProductList({ categoryId, ...props }: Props) {
  const {
    data: category,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => categories.getOne(categoryId),
  });

  if (isFetched && !category) {
    return null;
  }

  return (
    <View className="w-full gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">
        {isLoading ? `Buscando produtos...` : category?.name}
      </Text>
      <ScrollView horizontal className="grow-0 px-4 pb-2">
        {category?.products?.length === 0 && (
          <Text className="text-beige">Nenhum produto nesta categoria...</Text>
        )}
        {category?.products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </ScrollView>
    </View>
  );
}
