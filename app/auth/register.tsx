import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, GestureResponderEvent, Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { ERROR, INVALID, REQUIRED } from '@/constants';
import colors from '@/styles/colors';
import { applyMask, REGEX } from '@/utils/regex';

const registerSchema = z.object({
  fullName: z.string().min(3, REQUIRED.FIELD),
  email: z.string().min(3, REQUIRED.FIELD).email(INVALID.EMAIL),
  phone: z.string().min(3, REQUIRED.FIELD),
  password: z.string().min(3, REQUIRED.FIELD),
});

type FormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    try {
      const token = '123';
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Cadastre-se' }} />
      <Container className="gap-8 px-12">
        <Text className="text-2xl text-white">Cadastre-se conosco</Text>
        <FormControl isInvalid={!isValid}>
          <FormControlLabel>
            <FormControlLabelText>Nome Completo</FormControlLabelText>
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
                  placeholder="Como se chama?"
                />
              )}
              name="fullName"
            />
          </Input>
          <FormControlErrorText>{errors.fullName?.message}</FormControlErrorText>
        </FormControl>
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
            <FormControlLabelText>Telefone</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  onBlur={onBlur}
                  onChangeText={(e) => {
                    const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                    const phone = applyMask(numbers, REGEX.PHONE_NUMBER);
                    onChange(phone);
                  }}
                  maxLength={15}
                  value={value}
                  type="text"
                  placeholder="(51) 98888-7777"
                />
              )}
              name="phone"
            />
          </Input>
          <FormControlErrorText>{errors.phone?.message}</FormControlErrorText>
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
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Continuar</ButtonText>
        </Button>
      </Container>
    </>
  );
}
