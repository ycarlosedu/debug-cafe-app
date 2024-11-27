import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/button';
import CartButton from '@/components/cartButton';
import { Container } from '@/components/container';
import ProductCard from '@/components/productCard';
import ProductCategoriesList from '@/components/productCategoriesList';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { FormControl, FormControlErrorText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { ERROR, REQUIRED } from '@/constants';
import { Product } from '@/models/product';
import { products } from '@/services/products';

const searchSchema = z.object({
  name: z.string().min(1, REQUIRED.FIELD).min(3, REQUIRED.MIN(3)),
  category: z.string().optional(),
});

export type SearchProductValues = z.infer<typeof searchSchema>;

export default function Search() {
  const [productList, setProductList] = useState<Product[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<SearchProductValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: '',
      category: undefined,
    },
  });

  const { isSuccess, ...searchProductsMutation } = useMutation({
    mutationKey: ['products', getValues().name, getValues().category],
    mutationFn: products.search,
    onSuccess(data) {
      setProductList(data);
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmit = (data: SearchProductValues) => {
    searchProductsMutation.mutate(data);
  };

  const handleChangeCategory = (categoryId: string) => {
    if (getValues().category === categoryId) {
      setValue('category', undefined, { shouldValidate: true });
      handleSubmit(onSubmit)();
      return;
    }
    setValue('category', categoryId, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Buscar Produtos' }} />
      <ScrollViewContainer>
        <Container className="gap-4">
          <View className="gap-4 px-4">
            <FormControl>
              <Input>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      type="text"
                      placeholder="Diga o que deseja"
                    />
                  )}
                  name="name"
                />
              </Input>
              <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
            </FormControl>
            <Button onPress={handleSubmit(onSubmit)} isLoading={searchProductsMutation.isPending}>
              <ButtonText>Buscar</ButtonText>
            </Button>
          </View>
          <ProductCategoriesList
            title="Filtrar por Categoria"
            onCategoryPress={handleChangeCategory}
            selectedCategoriesIds={getValues().category ? ([getValues().category] as string[]) : []}
          />
          <View className="items-center gap-4 px-4">
            {isSuccess && !productList?.length && (
              <Text className="text-lg text-white">Nenhum produto encontrado</Text>
            )}
            {productList?.map((product) => <ProductCard key={product.id} product={product} />)}
          </View>
        </Container>
      </ScrollViewContainer>
      <CartButton />
    </>
  );
}
