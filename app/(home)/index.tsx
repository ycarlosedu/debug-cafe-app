import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import LogoImage from '@/assets/icon.png';
import CartButton from '@/components/cartButton';
import { Container } from '@/components/container';
import ProductCategoriesList from '@/components/productCategoriesList';
import ProductList from '@/components/productList';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { USER_TYPE } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { myAddress } from '@/services/address';
import { categories } from '@/services/categories';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function Home() {
  const { user } = useAuthStore();
  const { showToast } = useMyToast();
  const [categoriesIds, setCategoriesIds] = useState<string[]>();

  const {
    data: categoriesList,
    isLoading: isLoadingCategories,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  if (!categoriesIds && categoriesList) {
    setCategoriesIds([categoriesList[0]?.id, categoriesList[1]?.id]);
  }

  const { data: address, isLoading: isLoadingAddress } = useQuery({
    queryKey: ['address', user?.email],
    queryFn: myAddress.get,
    enabled: user?.userType !== USER_TYPE.GUEST,
  });

  const handleChangeCategory = (categoryId: string) => {
    if (categoriesIds?.includes(categoryId)) {
      if (categoriesIds?.length === 1) {
        return showToast({
          title: TOAST_TITLE.WARNING,
          message: 'Mantenha ao menos uma categoria selecionada!',
          action: TOAST_ACTION.WARNING,
        });
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
              source={LogoImage}
              className="rounded-full border-2 border-beige"
              style={{ width: 80, height: 80 }}
            />
            <View className="flex-row items-center justify-center gap-2">
              <FontAwesome size={16} color={colors.white} name="map-marker" />
              <Text className="text-sm text-white">
                {isLoadingAddress
                  ? 'Buscando endereço...'
                  : address?.city || 'Endereço não encontrado'}
              </Text>
            </View>
            <Text className="text-lg font-medium text-beige">O que vamos comer hoje?</Text>
          </View>

          <ProductCategoriesList
            title="Selecione nossas categorias"
            selectedCategoriesIds={categoriesIds}
            onCategoryPress={handleChangeCategory}
          />
          {isError && <Text className="w-full pl-4 text-white">Erro ao buscar produtos</Text>}
          {isLoadingCategories && (
            <Text className="w-full pl-4 text-white">Buscando produtos...</Text>
          )}
          {categoriesIds?.map((categoryId) => (
            <ProductList key={categoryId} categoryId={categoryId} />
          ))}
        </Container>
      </ScrollViewContainer>
      <CartButton />
    </>
  );
}
