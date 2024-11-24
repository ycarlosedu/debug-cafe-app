import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import CartProduct from '@/components/cartProduct';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import SelectedAddress from '@/components/selectedAddress';
import SelectedPayment from '@/components/selectedPayment';
import { ERROR } from '@/constants';
import { myAddress } from '@/services/address';
import { myCreditCards } from '@/services/credit-cards';
import { myOrders } from '@/services/orders';
import useCartStore from '@/stores/useCartStore';
import colors from '@/styles/colors';
import { format } from '@/utils/format';
import { secureStore } from '@/utils/secureStore';

export default function Cart() {
  const queryClient = useQueryClient();

  const { data: address } = useQuery({
    queryKey: ['address', secureStore.getToken()],
    queryFn: myAddress.get,
  });

  const { data: creditCards } = useQuery({
    queryKey: ['credit-cards', secureStore.getToken()],
    queryFn: myCreditCards.getAll,
  });

  const makeOrderMutation = useMutation({
    mutationFn: myOrders.create,
    onSuccess: ({ order }) => {
      queryClient.invalidateQueries({
        queryKey: ['orders', secureStore.getToken()],
      });
      router.replace({
        pathname: '/order/[id]',
        params: { id: order.id },
      });
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const [selectedPayment, setSelectedPayment] = useState('Pix');

  const { products, reset: resetCart } = useCartStore();

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * (product.quantity || 1),
    0
  );

  const hasProductsInCart = Boolean(products.length);

  const handleCreateOrder = () => {
    if (!address) {
      Alert.alert('Erro', 'Cadastre um endereço para entrega');
      return;
    }

    makeOrderMutation.mutate({
      addressId: address.id,
      paymentMethod: selectedPayment,
      products: products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Meu Carrinho' }} />
      <ScrollViewContainer>
        <Container className="gap-6 px-4">
          <View className="gap-1">
            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}

            {!hasProductsInCart && (
              <Text className="text-center text-2xl text-white">Seu carrinho está vazio!</Text>
            )}
          </View>
          {hasProductsInCart && (
            <Button appearance="secondary" onPress={resetCart}>
              <FontAwesome name="trash" size={24} color={colors.beige} />
              <ButtonText appearance="secondary">Limpar Carrinho</ButtonText>
            </Button>
          )}
          <Text className="text-2xl text-white">
            Total: {format.toBrazillianCurrency(totalPrice)}
          </Text>
          <SelectedAddress address={address} />
          <SelectedPayment
            selectedPayment={selectedPayment}
            onChangePayment={setSelectedPayment}
            creditCards={creditCards}
          />
          <Button disabled={!hasProductsInCart} onPress={handleCreateOrder}>
            <FontAwesome name="cart-arrow-down" size={24} color={colors.brown} />
            <ButtonText>Finalizar Compra</ButtonText>
          </Button>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
