import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';

import { Container } from '@/components/container';
import CreditCardForm, { CreditCardFormValues } from '@/components/forms/credit-card-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { CreditCard } from '@/models/credit-card';
import { myCreditCards } from '@/services/credit-cards';
import useAuthStore from '@/stores/useAuthStore';

export default function Payment() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showToast } = useMyToast();

  const addCreditCardMutation = useMutation({
    mutationFn: myCreditCards.add,
    onSuccess: ({ creditCard, message }) => {
      queryClient.setQueryData(['credit-cards', user?.email], (oldData: CreditCard[]) => [
        ...(oldData || []),
        creditCard,
      ]);
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
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
