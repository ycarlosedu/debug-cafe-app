import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import SelectedAddress from '@/components/selectedAddress';
import SelectedPayment from '@/components/selectedPayment';
import colors from '@/styles/colors';

export default function Cart() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meu Carrinho' }} />
      <ScrollViewContainer>
        <Container className="gap-6 px-4">
          <Text className="text-2xl text-white">Total: R$ 23,90</Text>
          <SelectedAddress />
          <SelectedPayment />
          <Button>
            <FontAwesome name="cart-arrow-down" size={24} color={colors.brown} />
            <ButtonText>Finalizar Compra</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
