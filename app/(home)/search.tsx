import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import ProductCategoriesList from '@/components/productCategoriesList';
import { FormControl, FormControlErrorText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { ERROR, REQUIRED } from '@/constants';

const searchSchema = z.object({
  search: z.string().min(1, REQUIRED.FIELD).min(3, REQUIRED.MIN(3)),
});

type FormValues = z.infer<typeof searchSchema>;

export default function Search() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    try {
      console.log(data);
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Buscar Produtos' }} />
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
                name="search"
              />
            </Input>
            <FormControlErrorText>{errors.search?.message}</FormControlErrorText>
          </FormControl>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Buscar</ButtonText>
          </Button>
        </View>
        <ProductCategoriesList title="Filtrar por Categorias" />
      </Container>
    </>
  );
}
