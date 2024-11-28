import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/button';
import {
  FormControl,
  FormControlErrorText,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { INVALID, REQUIRED } from '@/constants';
import { myAddress } from '@/services/address';
import { applyMask, REGEX } from '@/utils/regex';

const registerSchema = z.object({
  cep: z.string().min(1, REQUIRED.FIELD).regex(new RegExp(REGEX.CEP), INVALID.CEP),
  city: z.string().min(1, REQUIRED.FIELD),
  street: z.string().min(1, REQUIRED.FIELD),
  number: z.string().min(1, REQUIRED.FIELD),
});

export type AddressFormValues = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (data: AddressFormValues) => void;
  title?: string;
  submitText?: string;
  defaultValues?: AddressFormValues;
  isLoading?: boolean;
};

export default function RegisterAddressForm({
  onSubmit,
  title = '',
  submitText = 'Salvar',
  defaultValues,
  isLoading,
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const findByCepMutation = useMutation({
    mutationFn: myAddress.findByCep,
    onSuccess: ({ address }) => {
      setValue('city', address.city, { shouldValidate: true });
      setValue('street', address.street, { shouldValidate: true });
    },
  });

  const helpText = findByCepMutation.isPending ? '(Buscando pelo cep...)' : '';

  return (
    <>
      <Text className="text-2xl text-white">{title}</Text>
      <FormControl isInvalid={Boolean(errors.cep?.message)}>
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
                  if (numbers.length === 8) findByCepMutation.mutate(numbers);
                  const cep = applyMask(numbers, REGEX.CEP);
                  onChange(cep);
                }}
                keyboardType="numeric"
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
      <FormControl isInvalid={Boolean(errors.city?.message)}>
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
        <FormControlHelperText>{helpText}</FormControlHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.street?.message)}>
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
        <FormControlHelperText>{helpText}</FormControlHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.number?.message)}>
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
                keyboardType="numeric"
                placeholder="999"
              />
            )}
            name="number"
          />
        </Input>
        <FormControlErrorText>{errors.number?.message}</FormControlErrorText>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        <ButtonText>{submitText}</ButtonText>
      </Button>
    </>
  );
}
