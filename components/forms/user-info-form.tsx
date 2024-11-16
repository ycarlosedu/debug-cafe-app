import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GestureResponderEvent, Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/button';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { INVALID, REQUIRED } from '@/constants';
import colors from '@/styles/colors';
import { applyMask, REGEX } from '@/utils/regex';

const registerSchema = z.object({
  fullName: z.string().min(1, REQUIRED.FIELD).min(10, REQUIRED.MIN(10)),
  email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
  phone: z.string().min(1, REQUIRED.FIELD).regex(new RegExp(REGEX.PHONE_NUMBER), INVALID.PHONE),
  password: z.string().min(1, REQUIRED.FIELD).min(8, REQUIRED.MIN(8)).max(20, REQUIRED.MAX(20)),
});

export type RegisterUserFormValues = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (data: RegisterUserFormValues) => void;
  title?: string;
  submitText?: string;
};

export default function RegisterUserForm({ onSubmit, title = '', submitText = 'Salvar' }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  return (
    <>
      <Text className="text-2xl text-white">{title}</Text>
      <FormControl isInvalid={Boolean(errors.fullName?.message)}>
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
              />
            )}
            name="email"
          />
        </Input>
        <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.phone?.message)}>
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
              />
            )}
            name="password"
          />
          <InputSlot onPress={handleShowPassword}>
            <FontAwesome size={28} color={colors.white} name={showPassword ? 'eye' : 'eye-slash'} />
          </InputSlot>
        </Input>
        <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>{submitText}</ButtonText>
      </Button>
    </>
  );
}
