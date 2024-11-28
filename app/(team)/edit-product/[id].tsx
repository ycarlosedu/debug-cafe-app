import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputCurrency, InputField } from '@/components/ui/input';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { addProductSchema, AddProductValues } from '@/schemas';
import { categories } from '@/services/categories';
import { products } from '@/services/products';

type Params = {
  id: string;
};

export default function EditProduct() {
  const { id } = useLocalSearchParams<Params>();
  const queryClient = useQueryClient();
  const { showToast } = useMyToast();

  const { data: categoriesList } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll,
  });

  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => products.getOne(id),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product?.name || '',
      image: product?.image || '',
      price: product?.price || 0,
      description: product?.description || '',
      categories: product?.categories?.map(({ id }) => id) || [],
    },
  });

  const editProductMutation = useMutation({
    mutationFn: products.editProduct,
    onSuccess: ({ product }) => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.setQueryData(['product', product.id], product);
      router.back();
    },
    onError: (error: any) => {
      showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const onSubmit = async (values: AddProductValues) => {
    editProductMutation.mutate({ ...values, id });
  };

  const handleCategory = (categoryId: string) => {
    if (getValues('categories').includes(categoryId)) {
      return setValue(
        'categories',
        getValues('categories').filter((id) => id !== categoryId),
        { shouldValidate: true }
      );
    }
    setValue('categories', [...getValues('categories'), categoryId], { shouldValidate: true });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Editar Produto' }} />
      <ScrollViewContainer>
        <Container className="items-center justify-center gap-4 px-12">
          <Text className="text-2xl text-white">Revise os dados do Produto</Text>
          <FormControl isInvalid={Boolean(errors.name?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Nome do Produto</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type="text"
                    placeholder="Café?"
                    autoCapitalize="words"
                  />
                )}
                name="name"
              />
            </Input>
            <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.image?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Imagem</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type="text"
                    placeholder="https://www.example.com/image.jpg"
                    autoCapitalize="none"
                  />
                )}
                name="image"
              />
            </Input>
            <FormControlErrorText>{errors.image?.message}</FormControlErrorText>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.price?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Preço</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCurrency
                    value={value}
                    onChangeValue={onChange}
                    onBlur={onBlur}
                    maxValue={99999}
                  />
                )}
                name="price"
              />
            </Input>
            <FormControlErrorText>{errors.price?.message as string}</FormControlErrorText>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.description?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Descrição</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type="text"
                    placeholder="Descrição do produto"
                    autoCapitalize="sentences"
                  />
                )}
                name="description"
              />
            </Input>
            <FormControlErrorText>{errors.description?.message}</FormControlErrorText>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.description?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Categorias</FormControlLabelText>
            </FormControlLabel>
            <View className="flex-row flex-wrap gap-4">
              {categoriesList?.map((category) => {
                const isSelected = getValues('categories').includes(category.id);
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategory(category.id)}
                    className={`rounded-2xl px-3 py-2 ${isSelected ? 'bg-white' : 'bg-orange'}`}>
                    <Text className={isSelected ? 'text-brown' : 'text-white'}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <FormControlErrorText>{errors.categories?.message}</FormControlErrorText>
          </FormControl>

          <Button onPress={handleSubmit(onSubmit)} isLoading={editProductMutation.isPending}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
