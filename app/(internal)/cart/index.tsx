import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import CartProduct from '@/components/cartProduct';
import ConfirmDeleteDialog from '@/components/confirmDeleteDialog';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import SelectedAddress from '@/components/selectedAddress';
import SelectedPayment from '@/components/selectedPayment';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { USER_TYPE } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { Order } from '@/models/order';
import { myAddress } from '@/services/address';
import { myCreditCards } from '@/services/credit-cards';
import { myOrders } from '@/services/orders';
import useAuthStore from '@/stores/useAuthStore';
import useCartStore from '@/stores/useCartStore';
import useMenuStore, { MENU_STORE } from '@/stores/useMenuStore';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

export default function Cart() {
  const queryClient = useQueryClient();
  const { user, handleLogout } = useAuthStore();
  const { handleChangeMenu } = useMenuStore();
  const { showToast } = useMyToast();

  const { data: address } = useQuery({
    queryKey: ['address', user?.email],
    queryFn: myAddress.get,
  });

  const { data: creditCards } = useQuery({
    queryKey: ['credit-cards', user?.email],
    queryFn: myCreditCards.getAll,
  });

  const makeOrderMutation = useMutation({
    mutationFn: myOrders.create,
    onSuccess: ({ order, message }) => {
      useCartStore.getState().reset();
      queryClient.setQueryData(['orders', user?.email], (oldData: Order[]) => [
        order,
        ...(oldData || []),
      ]);
      queryClient.setQueryData(['pending-orders', user?.email], (oldData: Order[]) => [
        order,
        ...(oldData || []),
      ]);
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      router.replace({
        pathname: '/order/[id]',
        params: { id: order.id },
      });
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
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
    if (!address?.id) {
      return showToast({
        title: TOAST_TITLE.WARNING,
        message: 'Cadastre um endereço para entrega',
        action: TOAST_ACTION.WARNING,
      });
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
          <ConfirmDeleteDialog
            title="Tem certeza que deseja remover todos os itens do carrinho?"
            handleSubmit={resetCart}
          />
          <View className="gap-1">
            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}

            {!hasProductsInCart && (
              <Text className="text-center text-2xl text-white">Seu carrinho está vazio!</Text>
            )}
          </View>
          {hasProductsInCart && (
            <Button
              appearance="secondary"
              onPress={() => handleChangeMenu(MENU_STORE.DELETE_DIALOG, true)}>
              <FontAwesome name="trash" size={24} color={colors.beige} />
              <ButtonText appearance="secondary">Limpar Carrinho</ButtonText>
            </Button>
          )}
          <Text className="text-2xl text-white">
            Total: {format.toBrazillianCurrency(totalPrice)}
          </Text>
          {user?.userType !== USER_TYPE.GUEST && (
            <>
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
            </>
          )}

          {user?.userType === USER_TYPE.GUEST && (
            <View className="gap-4">
              <Text className="text-center text-xl text-white">
                Usuários convidados não podem realizar pedidos.
              </Text>
              <Button onPress={handleLogout}>
                <ButtonText>Fazer Login</ButtonText>
              </Button>
            </View>
          )}
        </Container>
      </ScrollViewContainer>
    </>
  );
}
