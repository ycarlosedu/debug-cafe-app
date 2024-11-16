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
import { applyMask, REGEX } from '@/utils/regex';

const registerSchema = z.object({
  cep: z.string().min(1, REQUIRED.FIELD).regex(new RegExp(REGEX.CEP), INVALID.CEP),
  city: z.string().min(1, REQUIRED.FIELD),
  street: z.string().min(1, REQUIRED.FIELD),
  number: z.string().min(1, REQUIRED.FIELD),
});

export type RegisterAddressFormValues = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (data: RegisterAddressFormValues) => void;
  title?: string;
  submitText?: string;
};

export default function RegisterAddressForm({
  onSubmit,
  title = '',
  submitText = 'Salvar',
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterAddressFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      cep: '',
      city: '',
      street: '',
      number: '',
    },
  });

  return (
    <>
      <Text className="text-2xl text-white">{title}</Text>
      <FormControl isInvalid={!isValid}>
        <FormControlLabel>
          <FormControlLabelText>CEP</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                maxLength={9}
                onBlur={onBlur}
                onChangeText={(e) => {
                  const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                  const cep = applyMask(numbers, REGEX.CEP);
                  onChange(cep);
                }}
                value={value}
                type="text"
                placeholder="99999-999"
              />
            )}
            name="cep"
          />
        </Input>
        <FormControlErrorText>{errors.cep?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={!isValid}>
        <FormControlLabel>
          <FormControlLabelText>Cidade</FormControlLabelText>
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
                placeholder="Onde mora?"
              />
            )}
            name="city"
          />
        </Input>
        <FormControlErrorText>{errors.city?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={!isValid}>
        <FormControlLabel>
          <FormControlLabelText>Logradouro</FormControlLabelText>
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
                placeholder="Rua XX"
              />
            )}
            name="street"
          />
        </Input>
        <FormControlErrorText>{errors.street?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={!isValid}>
        <FormControlLabel>
          <FormControlLabelText>Número</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={(e) => {
                  const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                  onChange(numbers);
                }}
                value={value}
                type="text"
                placeholder="999"
              />
            )}
            name="number"
          />
        </Input>
        <FormControlErrorText>{errors.number?.message}</FormControlErrorText>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>{submitText}</ButtonText>
      </Button>
    </>
  );
}
