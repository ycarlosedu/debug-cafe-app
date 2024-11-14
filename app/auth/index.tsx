import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, GestureResponderEvent, Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/bButton';
import { Container } from '@/components/cContainer';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { ERROR, INVALID, REQUIRED } from '@/constants';
import colors from '@/styles/colors';

const loginSchema = z.object({
  email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
  password: z.string().min(1, REQUIRED.FIELD),
});

type FormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const handleGuestLogin = () => {
    router.replace('/(home)');
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
      const token = '123';
      router.replace('/(home)');
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <Text className="text-2xl text-white">Entre com sua conta</Text>
          <FormControl isInvalid={!isValid}>
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
          <FormControl isInvalid={!isValid}>
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                  />
                )}
                name="password"
              />
              <InputSlot onPress={handleShowPassword}>
                <FontAwesome
                  size={28}
                  color={colors.white}
                  name={showPassword ? 'eye' : 'eye-slash'}
                />
              </InputSlot>
            </Input>
            <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
          </FormControl>
          <Link href="/(home)" className="self-end text-sm text-beige">
            Esqueci minha senha
          </Link>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Continuar</ButtonText>
          </Button>
          <Button appearance="secondary" onPress={handleGuestLogin}>
            <ButtonText appearance="secondary">Entrar como convidado</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
