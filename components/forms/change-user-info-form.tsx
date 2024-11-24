import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/button';
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { INVALID, REQUIRED } from '@/constants';
import useAuthStore from '@/stores/useAuthStore';
import { applyMask, REGEX } from '@/utils/regex';

const registerSchema = z.object({
  fullName: z.string().min(1, REQUIRED.FIELD).min(10, REQUIRED.MIN(10)),
  email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
  phone: z.string().min(1, REQUIRED.FIELD).regex(new RegExp(REGEX.PHONE_NUMBER), INVALID.PHONE),
});

export type ChangeUserInfoFormValues = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (data: ChangeUserInfoFormValues) => void;
  title?: string;
  submitText?: string;
};

export default function ChangeUserInfoForm({ onSubmit, title = '', submitText = 'Salvar' }: Props) {
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserInfoFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      phone: applyMask(user?.phone || '', REGEX.PHONE_NUMBER),
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
                autoCapitalize="words"
              />
            )}
            name="fullName"
          />
        </Input>
        <FormControlErrorText>{errors.fullName?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.email?.message)} isDisabled>
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
                keyboardType="email-address"
                placeholder="exemplo@cafeteria.com"
                autoCapitalize="none"
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
                keyboardType="phone-pad"
              />
            )}
            name="phone"
          />
        </Input>
        <FormControlErrorText>{errors.phone?.message}</FormControlErrorText>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>{submitText}</ButtonText>
      </Button>
    </>
  );
}
