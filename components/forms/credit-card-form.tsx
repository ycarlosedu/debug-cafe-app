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

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, REQUIRED.FIELD)
    .regex(new RegExp(REGEX.CREDIT_CARD), INVALID.CREDIT_CARD),
  cpf: z.string().min(1, REQUIRED.FIELD).regex(new RegExp(REGEX.CPF), INVALID.CPF),
  cvv: z.string().min(1, REQUIRED.FIELD),
  expirationDate: z
    .string()
    .min(1, REQUIRED.FIELD)
    .regex(new RegExp(REGEX.EXPIRATION_DATE), INVALID.EXPIRATION_DATE),
});

export type CreditCardFormValues = z.infer<typeof cardSchema>;

type Props = {
  onSubmit: (data: CreditCardFormValues) => void;
  title?: string;
  submitText?: string;
};

export default function CreditCardForm({ onSubmit, title = '', submitText = 'Salvar' }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditCardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: '',
      cpf: '',
      cvv: '',
      expirationDate: '',
    },
  });

  return (
    <>
      <Text className="text-2xl text-white">{title}</Text>
      <FormControl isInvalid={Boolean(errors.cardNumber?.message)}>
        <FormControlLabel>
          <FormControlLabelText>Número do Cartão</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={(e) => {
                  const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                  const card = applyMask(numbers, REGEX.CREDIT_CARD);
                  onChange(card);
                }}
                maxLength={19}
                value={value}
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            )}
            name="cardNumber"
          />
        </Input>
        <FormControlErrorText>{errors.cardNumber?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.cpf?.message)}>
        <FormControlLabel>
          <FormControlLabelText>CPF do titular</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={(e) => {
                  const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                  const cpf = applyMask(numbers, REGEX.CPF);
                  onChange(cpf);
                }}
                maxLength={14}
                value={value}
                type="text"
                placeholder="000.111.222-33"
              />
            )}
            name="cpf"
          />
        </Input>
        <FormControlErrorText>{errors.cpf?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.cvv?.message)}>
        <FormControlLabel>
          <FormControlLabelText>CVV</FormControlLabelText>
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
                maxLength={3}
                value={value}
                type="text"
                placeholder="999"
              />
            )}
            name="cvv"
          />
        </Input>
        <FormControlErrorText>{errors.cvv?.message}</FormControlErrorText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.expirationDate?.message)}>
        <FormControlLabel>
          <FormControlLabelText>Data de validade</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onBlur={onBlur}
                onChangeText={(e) => {
                  const numbers = applyMask(e, REGEX.ONLY_NUMBERS);
                  const date = applyMask(numbers, REGEX.EXPIRATION_DATE);
                  onChange(date);
                }}
                value={value}
                type="text"
                placeholder="12/2032"
                maxLength={7}
              />
            )}
            name="expirationDate"
          />
        </Input>
        <FormControlErrorText>{errors.expirationDate?.message}</FormControlErrorText>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>{submitText}</ButtonText>
      </Button>
    </>
  );
}
