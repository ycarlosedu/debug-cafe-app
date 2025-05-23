import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GestureResponderEvent, Image, Text } from 'react-native';

import LogoImage from '@/assets/icon.png';
import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { signInSchema, SignInValues } from '@/schemas';
import { auth } from '@/services/auth';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function Login() {
  const { handleLogin } = useAuthStore();
  const { showToast } = useMyToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const signInMutation = useMutation({
    mutationFn: auth.signIn,
    onSuccess: ({ token, user }) => {
      handleLogin(token, user);
      router.replace('/(home)');
    },
    onError: (error: any) => {
      showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const guestMutation = useMutation({
    mutationFn: auth.guestSignIn,
    onSuccess: ({ token, user }) => {
      handleLogin(token, user);
      router.replace('/(home)');
    },
    onError: (error: any) => {
      showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInValues) => {
    signInMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-8 px-12">
          <Image source={LogoImage} className="self-center" style={{ width: 100, height: 100 }} />
          <Text className="text-2xl text-white">Entre com sua conta</Text>
          <FormControl isInvalid={Boolean(errors.email?.message)}>
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
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
            </Input>
            <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password?.message)}>
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
                    autoCapitalize="none"
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
          <Button onPress={handleSubmit(onSubmit)} isLoading={signInMutation.isPending}>
            <ButtonText>Continuar</ButtonText>
          </Button>
          <Button
            appearance="secondary"
            onPress={() => guestMutation.mutate()}
            isLoading={guestMutation.isPending}>
            <ButtonText appearance="secondary">Entrar como convidado</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
