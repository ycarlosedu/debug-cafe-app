import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { INVALID, REQUIRED } from '@/constants';

const loginSchema = z.object({
  email: z.string().min(3, REQUIRED.FIELD).email(INVALID.EMAIL),
  password: z.string().min(3, REQUIRED.FIELD),
});

type FormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    try {
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro', error.msg || 'Usuário ou senha inválidos');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <Container className="gap-12 px-12">
        <Text className="text-2xl text-white">Entre com sua conta</Text>
        <FormControl isInvalid={false}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
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
                  placeholder="exemplo@cafeteria.com"
                />
              )}
              name="email"
            />
          </Input>
          <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
        </FormControl>
        <FormControl isInvalid={false}>
          <FormControlLabel>
            <FormControlLabelText>Senha</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                  placeholder="********"
                />
              )}
              name="password"
            />
          </Input>
          <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
        </FormControl>
        <Link href="/" className="self-end text-sm text-beige">
          Esqueci minha senha
        </Link>
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Continuar</ButtonText>
        </Button>
        <Button appearance="secondary">
          <ButtonText appearance="secondary">Entrar como convidado</ButtonText>
        </Button>
      </Container>
    </>
  );
}
