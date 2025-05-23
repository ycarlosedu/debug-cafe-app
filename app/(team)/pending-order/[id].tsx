import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import Loader from '@/components/loader';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import TextHighlight from '@/components/textHighlight';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import {
  isUserFromTeam,
  ORDER_STATUS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
  USER_TYPE,
} from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { DetailedOrder, Order } from '@/models/order';
import { teamOrders } from '@/services/orders';
import useAuthStore from '@/stores/useAuthStore';
import { format } from '@/utils/format';
import { toBrazilianDate } from '@/utils/format/date';

type Params = {
  id: string;
};

export default function PendingOrder() {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<Params>();
  const { user } = useAuthStore();
  const { showToast } = useMyToast();

  const { data: order, isLoading } = useQuery({
    queryKey: ['pending-order', id, user?.email],
    queryFn: () => teamOrders.getPendingOrder(id),
    staleTime: 1000 * 60, // 1 minute
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: teamOrders.updateOrderStatus,
    onSuccess: ({ status, message }) => {
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      queryClient.invalidateQueries({
        queryKey: ['orders', user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ['order', id, user?.email],
      });
      queryClient.setQueryData(['pending-orders', user?.email], (oldData: DetailedOrder[]) =>
        oldData.map((oldOrder) => (oldOrder.id === id ? { ...oldOrder, status } : oldOrder))
      );
      queryClient.setQueryData(['pending-order', id, user?.email], (oldData: DetailedOrder) => ({
        ...oldData,
        status,
      }));
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: teamOrders.cancelOrder,
    onSuccess: ({ status, message }) => {
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      queryClient.invalidateQueries({
        queryKey: ['orders', user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ['order', id, user?.email],
      });
      queryClient.setQueryData(['pending-orders', user?.email], (oldData: Order[]) =>
        oldData.map((oldOrder) => (oldOrder.id === id ? { ...oldOrder, status } : oldOrder))
      );
      queryClient.setQueryData(['pending-order', id, user?.email], (oldData: DetailedOrder) => ({
        ...oldData,
        status,
      }));
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!order || !isUserFromTeam(user?.userType) || !user?.userType) {
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
      <Stack.Screen options={{ title: 'Detalhes do Pedido' }} />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-6 px-12">
          <Text className="text-center text-base text-white">
            Pedido realizado em {toBrazilianDate(order.createdAt)}
          </Text>
          <TextHighlight className="">
            Pedido {ORDER_STATUS_LABEL[order.status]}
            {'  '}
            <FontAwesome size={16} color={ORDER_STATUS_COLOR[order.status]} name="circle" />
          </TextHighlight>

          <View className="gap-4">
            {order.products.map((product) => (
              <View key={product.name} className="flex-row justify-between">
                <Text className="text-beige">
                  x{product.quantity} {product.name}
                </Text>
                <Text className="text-beige">{format.toBrazillianCurrency(product.price)}</Text>
              </View>
            ))}
          </View>

          <Text className="text-center text-2xl text-white">
            Total: {format.toBrazillianCurrency(order.totalPrice)}
          </Text>
          <View className="gap-2">
            <Text className="text-lg text-beige">Forma de Pagamento</Text>
            <TextHighlight>{order.paymentMethod}</TextHighlight>
          </View>
          <View className="gap-2">
            <Text className="text-lg text-beige">Endereço de Entrega</Text>
            <TextHighlight>
              {order.address.street}, {order.address.number}
            </TextHighlight>
          </View>

          {order.status === ORDER_STATUS.PENDING &&
            [USER_TYPE.STAFF, USER_TYPE.MANAGER].includes(user.userType) && (
              <Button
                isLoading={updateOrderStatusMutation.isPending}
                onPress={() => {
                  updateOrderStatusMutation.mutate(id);
                }}>
                <ButtonText>Confirmar Pedido</ButtonText>
              </Button>
            )}

          {order.status === ORDER_STATUS.IN_PREPARATION &&
            [USER_TYPE.DELIVERY, USER_TYPE.MANAGER].includes(user.userType) && (
              <Button
                isLoading={updateOrderStatusMutation.isPending}
                onPress={() => {
                  updateOrderStatusMutation.mutate(id);
                }}>
                <ButtonText>Iniciar Entrega</ButtonText>
              </Button>
            )}

          {order.status === ORDER_STATUS.ON_THE_WAY &&
            [USER_TYPE.DELIVERY, USER_TYPE.MANAGER].includes(user.userType) && (
              <Button
                isLoading={updateOrderStatusMutation.isPending}
                onPress={() => {
                  updateOrderStatusMutation.mutate(id);
                }}>
                <ButtonText>Finalizar Entrega</ButtonText>
              </Button>
            )}

          {![ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELED].includes(order.status) &&
            [USER_TYPE.STAFF, USER_TYPE.MANAGER].includes(user.userType) && (
              <Button
                appearance="secondary"
                isLoading={cancelOrderMutation.isPending}
                onPress={() => {
                  cancelOrderMutation.mutate(id);
                }}>
                <ButtonText appearance="secondary">Cancelar Pedido</ButtonText>
              </Button>
            )}
        </Container>
      </ScrollViewContainer>
    </>
  );
}
