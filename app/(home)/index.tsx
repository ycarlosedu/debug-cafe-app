import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';

import UserImage from '@/assets/images/user.png';
import CartButton from '@/components/cartButton';
import { Container } from '@/components/container';
import ProductCategoriesList from '@/components/productCategoriesList';
import ProductList from '@/components/productList';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { myAddress } from '@/services/address';
import { categories } from '@/services/categories';
import colors from '@/styles/colors';
import { secureStore } from '@/utils/secureStore';

export default function Home() {
  const [categoriesIds, setCategoriesIds] = useState<string[]>();

  const { data: categoriesList } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  if (!categoriesIds && categoriesList) {
    setCategoriesIds([categoriesList[0]?.id, categoriesList[1]?.id]);
  }

  const { data: address } = useQuery({
    queryKey: ['address', secureStore.getToken()],
    queryFn: myAddress.get,
  });

  const handleChangeCategory = (categoryId: string) => {
    if (categoriesIds?.includes(categoryId)) {
      if (categoriesIds?.length === 1) {
        return Alert.alert('Erro', 'Mantenha ao menos uma categoria selecionada!');
      }
      setCategoriesIds((prevState) => prevState?.filter((id) => id !== categoryId));
      return;
    }
    setCategoriesIds((prevState) => [...(prevState || []), categoryId]);
  };

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
              <Text className="text-sm text-white">
                {address?.city || 'Endereço não cadastrado'}
              </Text>
            </View>
            <Text className="text-lg font-medium text-beige">O que vamos comer hoje?</Text>
          </View>

          <ProductCategoriesList
            title="Selecione nossas categorias"
            selectedCategoriesIds={categoriesIds}
            onCategoryPress={handleChangeCategory}
          />
          {categoriesIds?.map((categoryId) => (
            <ProductList key={categoryId} categoryId={categoryId} />
          ))}
        </Container>
      </ScrollViewContainer>
      <CartButton />
    </>
  );
}
