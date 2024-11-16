import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  FormControl,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { ERROR, REQUIRED } from '@/constants';
import { orders } from '@/mocks/orders';

const FEEDBACK_MAX_LENGTH = 255;

const feedbackSchema = z.object({
  feedbackComment: z
    .string()
    .min(1, REQUIRED.FIELD)
    .max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  feedbackStars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
  deliveryFeedbackComment: z
    .string()
    .min(1, REQUIRED.FIELD)
    .max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  deliveryFeedbackStars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
});

type FormValues = z.infer<typeof feedbackSchema>;

type Params = {
  id: string;
};

export default function OrderFeedback() {
  const { id } = useLocalSearchParams<Params>();
  const order = orders.find((order) => order.id.toString() === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedbackComment: '',
      feedbackStars: 0,
      deliveryFeedbackComment: '',
      deliveryFeedbackStars: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    try {
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  if (!order) {
    return (
      <>
        <Stack.Screen options={{ title: 'Oops' }} />
        <Container className="items-center justify-center px-12">
          <Text className="text-center text-white">Pedido não encontrado</Text>
        </Container>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Avaliar Pedido' }} />
      <ScrollViewContainer>
        <Container className="gap-6 px-12">
          <View className="gap-2">
            <FormControl isInvalid={Boolean(errors.feedbackComment?.message)}>
              <FormControlLabel>
                <FormControlLabelText className="text-2xl">Produtos</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="feedbackComment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input>
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        type="text"
                        placeholder="Descreva como foi a experiência com os PRODUTOS."
                        multiline
                        numberOfLines={6}
                        maxLength={FEEDBACK_MAX_LENGTH}
                      />
                    </Input>
                    <FormControlHelper>
                      <FormControlHelperText>
                        {value.length} / {FEEDBACK_MAX_LENGTH}
                      </FormControlHelperText>
                    </FormControlHelper>
                  </>
                )}
              />
              <FormControlErrorText>{errors.feedbackComment?.message}</FormControlErrorText>
            </FormControl>
            <Text className="text-lg text-beige">Satisfação:</Text>
          </View>

          <View className="gap-2">
            <FormControl isInvalid={Boolean(errors.deliveryFeedbackComment?.message)}>
              <FormControlLabel>
                <FormControlLabelText className="text-2xl">Entrega</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="deliveryFeedbackComment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input>
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        type="text"
                        placeholder="Descreva como foi a experiência com a ENTREGA."
                        multiline
                        numberOfLines={6}
                        maxLength={FEEDBACK_MAX_LENGTH}
                      />
                    </Input>
                    <FormControlHelper>
                      <FormControlHelperText>
                        {value.length} / {FEEDBACK_MAX_LENGTH}
                      </FormControlHelperText>
                    </FormControlHelper>
                  </>
                )}
              />
              <FormControlErrorText>{errors.deliveryFeedbackComment?.message}</FormControlErrorText>
            </FormControl>
            <Text className="text-lg text-beige">Satisfação:</Text>
          </View>

          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Enviar Avaliação</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
