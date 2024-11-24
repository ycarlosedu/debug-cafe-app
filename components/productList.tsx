import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, View, ViewProps } from 'react-native';

import ProductCard from './productCard';

import { categories } from '@/services/categories';

type Props = ViewProps & {
  categoryId: string;
};

export default function ProductList({ categoryId, ...props }: Props) {
  const {
    data: categorie,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => categories.getOne(categoryId),
  });

  if (isFetched && !categorie) {
    return null;
  }

  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">
        {isLoading ? `Buscando produtos...` : categorie?.name}
      </Text>
      <ScrollView horizontal className="grow-0 px-4 pb-2">
        {categorie?.products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </ScrollView>
    </View>
  );
}
