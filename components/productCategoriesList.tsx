import { Image, ScrollView, Text, View, ViewProps } from 'react-native';

import { productCategories } from '@/mocks/productCategories';

type Props = ViewProps & {
  title: string;
};

export default function ProductCategoriesList({ title, ...props }: Props) {
  return (
    <View className="gap-4" {...props}>
      <Text className="pl-4 text-lg font-medium text-beige">{title}</Text>
      <ScrollView horizontal className="grow-0 pb-2">
        {productCategories.map((category) => (
          <View key={category.id} className="mx-4 items-center gap-4">
            <Image
              source={category.image}
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
