import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import CartProduct from '@/components/cartProduct';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import SelectedAddress from '@/components/selectedAddress';
import SelectedPayment from '@/components/selectedPayment';
import { products } from '@/mocks/products';
import colors from '@/styles/colors';

export default function Cart() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meu Carrinho' }} />
      <ScrollViewContainer>
        <Container className="gap-6 px-4">
          <View className="gap-1">
            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </View>
          <Button appearance="secondary">
            <FontAwesome name="trash" size={24} color={colors.beige} />
            <ButtonText appearance="secondary">Limpar Carrinho</ButtonText>
          </Button>
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
