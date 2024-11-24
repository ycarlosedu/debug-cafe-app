import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import CreditCardForm, { CreditCardFormValues } from '@/components/forms/credit-card-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';

export default function Payment() {
  const onSubmitPaymentForm = (data: CreditCardFormValues) => {
    console.log(data);
    try {
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Adicionar Cartão' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <CreditCardForm onSubmit={onSubmitPaymentForm} />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
