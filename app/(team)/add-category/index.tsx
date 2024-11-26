import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { ERROR } from '@/constants';
import { ProductCategory } from '@/models/product';
import { addCategorySchema, AddCategoryValues } from '@/schemas';
import { categories } from '@/services/categories';

export default function AddCategory() {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: categories.addCategory,
    onSuccess: ({ category, message }) => {
      queryClient.setQueryData(['categories'], (data: ProductCategory[]) => [...data, category]);
      reset();
      Alert.alert('Sucesso', message);
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmit = async (values: AddCategoryValues) => {
    addCategoryMutation.mutate(values);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Adicionar Categoria' }} />
      <ScrollViewContainer>
        <Container className="items-center justify-center gap-4 px-12">
          <Text className="text-2xl text-white">Informe os dados da Categoria</Text>
          <FormControl isInvalid={Boolean(errors.name?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Nome da Categoria</FormControlLabelText>
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
                    placeholder="Cafés Gelados?"
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

          <Button onPress={handleSubmit(onSubmit)} isLoading={addCategoryMutation.isPending}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
