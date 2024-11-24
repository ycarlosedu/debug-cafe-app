import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';

import UserImage from '@/assets/images/user.png';
import CartButton from '@/components/cartButton';
import { Container } from '@/components/container';
import ProductCategoriesList from '@/components/productCategoriesList';
import ProductList from '@/components/productList';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { categories } from '@/services/categories';
import colors from '@/styles/colors';

export default function Home() {
  const { data: categoriesList } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Debug Café' }} />
      <ScrollViewContainer>
        <Container className="items-center gap-8">
          <View className="items-center gap-3">
            <Image
              source={UserImage}
              className="rounded-full border-2 border-beige"
              style={{ width: 56, height: 56 }}
            />
            <View className="flex-row items-center justify-center gap-2">
              <FontAwesome size={16} color={colors.white} name="map-marker" />
              <Text className="text-sm text-white">Porto Alegre, RS</Text>
            </View>
            <Text className="text-lg font-medium text-beige">O que vamos comer hoje?</Text>
          </View>

          <ProductCategoriesList title="Categorias" />
          {categoriesList && (
            <>
              <ProductList categoryId={categoriesList[0].id} />
              <ProductList categoryId={categoriesList[1].id} />
            </>
          )}
        </Container>
      </ScrollViewContainer>
      <CartButton />
    </>
  );
}
