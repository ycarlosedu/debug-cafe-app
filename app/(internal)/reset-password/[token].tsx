import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GestureResponderEvent, Text } from 'react-native';
import { z } from 'zod';

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
import { REQUIRED } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import colors from '@/styles/colors';

const resetPasswordSchema = z.object({
  password: z.string().min(1, REQUIRED.FIELD),
});

type FormValues = z.infer<typeof resetPasswordSchema>;

type Params = {
  user: string;
};

export default function ResetPassword() {
  const params = useLocalSearchParams<Params>();
  const { showToast } = useMyToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    console.log('🚀 ~ InternalAccess ~ params:', params);
    try {
      router.replace('/(home)');
    } catch (error: any) {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Redefinição de Senha' }} />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-12 px-12">
          <Text className="text-2xl text-white">Digite sua nova senha</Text>
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
                    keyboardType="numeric"
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
            <ButtonText>Salvar</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
