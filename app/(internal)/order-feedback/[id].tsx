import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myOrders } from '@/services/orders';
import { secureStore } from '@/utils/secureStore';

const FEEDBACK_MAX_LENGTH = 255;

const feedbackSchema = z.object({
  feedbackComment: z.string().max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  feedbackStars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
  deliveryFeedbackComment: z.string().max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  deliveryFeedbackStars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
});

export type FeedbackValues = z.infer<typeof feedbackSchema>;

type Params = {
  id: string;
};

export default function OrderFeedback() {
  const { id } = useLocalSearchParams<Params>();
  const queryClient = useQueryClient();

  const addFeedbackMutation = useMutation({
    mutationFn: myOrders.addFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order', id, secureStore.getToken()],
      });
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedbackComment: '',
      feedbackStars: 1,
      deliveryFeedbackComment: '',
      deliveryFeedbackStars: 1,
    },
  });

  const onSubmit = (data: FeedbackValues) => {
    addFeedbackMutation.mutate({ orderId: id, ...data });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Avaliar Pedido' }} />
      <ScrollViewContainer>
        <Container className="gap-6 px-12">
          <View className="gap-2">
            <Text className="text-center text-2xl font-bold text-beige">Sobre os Produtos</Text>
            <FormControl isInvalid={Boolean(errors.feedbackStars?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Satisfação</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="feedbackStars"
                render={({ field: { onChange, value } }) => (
                  <StarRating enableHalfStar={false} rating={value} onChange={onChange} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.feedbackComment?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Algum comentário?</FormControlLabelText>
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
          </View>

          <View className="gap-2">
            <Text className="text-center text-2xl font-bold text-beige">Sobre a Entrega</Text>
            <FormControl isInvalid={Boolean(errors.deliveryFeedbackStars?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Satisfação</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="deliveryFeedbackStars"
                render={({ field: { onChange, value } }) => (
                  <StarRating enableHalfStar={false} rating={value} onChange={onChange} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.deliveryFeedbackComment?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Algum comentário?</FormControlLabelText>
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
          </View>

          <Button onPress={handleSubmit(onSubmit)} isLoading={addFeedbackMutation.isPending}>
            <ButtonText>Enviar Avaliação</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
