import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
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
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { REQUIRED } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { Order } from '@/models/order';
import { myOrders } from '@/services/orders';
import useAuthStore from '@/stores/useAuthStore';

const FEEDBACK_MAX_LENGTH = 255;

const feedbackSchema = z.object({
  comment: z.string().max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  stars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
  deliveryComment: z.string().max(FEEDBACK_MAX_LENGTH, REQUIRED.MAX(FEEDBACK_MAX_LENGTH)),
  deliveryStars: z.number().min(1, REQUIRED.FIELD).max(5, REQUIRED.MAX_STARS),
});

export type FeedbackValues = z.infer<typeof feedbackSchema>;

type Params = {
  id: string;
};

export default function OrderFeedback() {
  const { id } = useLocalSearchParams<Params>();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showToast } = useMyToast();

  const addFeedbackMutation = useMutation({
    mutationFn: myOrders.addFeedback,
    onSuccess: (feedback) => {
      queryClient.setQueryData(['order', id, user?.email], (data: Order) => ({
        ...data,
        feedback,
      }));
      queryClient.setQueryData(['orders', user?.email], (data: Order[]) => {
        return data.map((order) => (order.id === id ? { ...order, feedback } : order));
      });
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message: 'Avaliação adicionada com sucesso!',
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: '',
      stars: 1,
      deliveryComment: '',
      deliveryStars: 1,
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
            <FormControl isInvalid={Boolean(errors.stars?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Satisfação</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="stars"
                render={({ field: { onChange, value } }) => (
                  <StarRating enableHalfStar={false} rating={value} onChange={onChange} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.comment?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Algum comentário?</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="comment"
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
              <FormControlErrorText>{errors.comment?.message}</FormControlErrorText>
            </FormControl>
          </View>

          <View className="gap-2">
            <Text className="text-center text-2xl font-bold text-beige">Sobre a Entrega</Text>
            <FormControl isInvalid={Boolean(errors.deliveryStars?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Satisfação</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="deliveryStars"
                render={({ field: { onChange, value } }) => (
                  <StarRating enableHalfStar={false} rating={value} onChange={onChange} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.deliveryComment?.message)}>
              <FormControlLabel>
                <FormControlLabelText>Algum comentário?</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="deliveryComment"
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
              <FormControlErrorText>{errors.deliveryComment?.message}</FormControlErrorText>
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
