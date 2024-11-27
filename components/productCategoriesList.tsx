import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, Text, TouchableOpacity, View, ViewProps } from 'react-native';

import { categories } from '@/services/categories';

const categoryImageStyle = tva({
  base: 'rounded-full border-2 border-beige',
  variants: {
    selected: {
      true: 'border-black',
      false: '',
    },
  },
});

type Props = ViewProps & {
  title: string;
  onCategoryPress?: (categoryId: string) => void;
  selectedCategoriesIds?: string[];
};

export default function ProductCategoriesList({
  title,
  onCategoryPress,
  selectedCategoriesIds = [],
  ...props
}: Props) {
  const {
    data: categoriesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  if (isLoading) {
    return (
      <View className="w-full gap-4" {...props}>
        <Text className="pl-4 text-lg font-medium text-beige">Buscando categorias...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="w-full gap-4" {...props}>
        <Text className="pl-4 text-lg font-medium text-beige">Erro ao buscar categorias</Text>
      </View>
    );
  }

  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">{title}</Text>
      <ScrollView horizontal className="grow-0 pb-2">
        {categoriesList?.map((category) => (
          <TouchableOpacity
            onPress={() => (onCategoryPress ? onCategoryPress(category.id) : null)}
            key={category.id}
            className="mx-4 items-center gap-4">
            <Image
              source={{
                uri: category.image,
              }}
              className={categoryImageStyle({
                selected: selectedCategoriesIds.includes(category.id),
              })}
              style={{ width: 64, height: 64 }}
            />
            <Text className="text-sm text-white">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
