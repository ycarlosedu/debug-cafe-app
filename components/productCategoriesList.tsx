import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, Text, View, ViewProps } from 'react-native';

import { categories } from '@/services/categories';

type Props = ViewProps & {
  title: string;
};

export default function ProductCategoriesList({ title, ...props }: Props) {
  const { data: categoriesList, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  if (isLoading) {
    return <Text className="pl-4 text-lg font-medium text-beige">Buscando categorias...</Text>;
  }

  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">{title}</Text>
      <ScrollView horizontal className="grow-0 pb-2">
        {categoriesList?.map((category) => (
          <View key={category.id} className="mx-4 items-center gap-4">
            <Image
              source={{
                uri: category.image,
              }}
              className="rounded-full border-2 border-beige"
              style={{ width: 64, height: 64 }}
            />
            <Text className="text-sm text-white">{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
