import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import CreditCardForm, { CreditCardFormValues } from '@/components/forms/credit-card-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';
import { CreditCard } from '@/models/credit-card';
import { myCreditCards } from '@/services/credit-cards';
import useAuthStore from '@/stores/useAuthStore';

export default function Payment() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const addCreditCardMutation = useMutation({
    mutationFn: myCreditCards.add,
    onSuccess: ({ creditCard }) => {
      queryClient.setQueryData(['credit-cards', user?.email], (oldData: CreditCard[]) => [
        ...(oldData || []),
        creditCard,
      ]);
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmitPaymentForm = (data: CreditCardFormValues) => {
    addCreditCardMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Adicionar Cartão' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <CreditCardForm
            onSubmit={onSubmitPaymentForm}
            isLoading={addCreditCardMutation.isPending}
          />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
