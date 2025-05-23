import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GestureResponderEvent, Text, View } from 'react-native';
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
import { REQUIRED, USER_TYPE, USER_TYPE_LABEL } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { auth } from '@/services/auth';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

const internalAccessSchema = z.object({
  userType: z.nativeEnum(USER_TYPE),
  password: z.string().min(1, REQUIRED.FIELD),
});

export type InternalAccessValues = z.infer<typeof internalAccessSchema>;

type Params = {
  user: USER_TYPE;
};

export default function InternalAccess() {
  const { handleLogin } = useAuthStore();
  const { showToast } = useMyToast();

  const params = useLocalSearchParams<Params>();
  const userLabel = USER_TYPE_LABEL[params.user];

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InternalAccessValues>({
    resolver: zodResolver(internalAccessSchema),
    defaultValues: {
      userType: params.user,
      password: '',
    },
  });

  const changeUserTypeMutation = useMutation({
    mutationFn: auth.changeUserType,
    onSuccess: ({ token, user }) => {
      handleLogin(token, user);
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message: `Usuário alterado com sucesso para ${userLabel}`,
        action: TOAST_ACTION.SUCCESS,
      });
      router.back();
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const onSubmit = (data: InternalAccessValues) => {
    changeUserTypeMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Acesso Interno' }} />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-12 px-12">
          <Text className="text-2xl text-white">Acesse como {userLabel}</Text>
          <View className="gap-2">
            <Text className="text-lg text-white">
              Por questões de testes, as senhas são as seguintes:
            </Text>
            <Text className="text-white">Funcionário: STAFF</Text>
            <Text className="text-white">Supervisor: MANAGER</Text>
            <Text className="text-white">Motoboy: DELIVERY</Text>
          </View>
          <FormControl isInvalid={Boolean(errors.password?.message)}>
            <FormControlLabel>
              <FormControlLabelText>Senha de {userLabel}</FormControlLabelText>
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
          <Button isLoading={changeUserTypeMutation.isPending} onPress={handleSubmit(onSubmit)}>
            <ButtonText>Continuar</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
