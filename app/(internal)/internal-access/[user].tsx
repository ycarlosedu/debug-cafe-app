import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack, useLocalSearchParams } from 'expo-router';
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
import { ERROR, REQUIRED, USER_TYPE } from '@/constants';
import colors from '@/styles/colors';

const InternalAccessSchema = z.object({
  password: z.string().min(1, REQUIRED.FIELD),
});

type FormValues = z.infer<typeof InternalAccessSchema>;

type Params = {
  user: USER_TYPE;
};

const USER_TYPE_LABEL = {
  [USER_TYPE.STAFF]: 'Funcionário',
  [USER_TYPE.MANAGER]: 'Supervisor',
  [USER_TYPE.DELIVERY]: 'Motoboy',
};

export default function InternalAccess() {
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
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(InternalAccessSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    try {
      router.replace('/profile');
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Acesso Interno' }} />
      <Container className="gap-12 px-12">
        <Text className="text-2xl text-white">Acesse como {userLabel}</Text>
        <FormControl isInvalid={!isValid}>
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
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Continuar</ButtonText>
        </Button>
      </Container>
    </>
  );
}
