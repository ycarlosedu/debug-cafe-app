import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import TextHighlight from '@/components/textHighlight';
import { ORDER_STATUS, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from '@/constants';
import { orders } from '@/mocks/orders';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

type Params = {
  id: string;
};

export default function Order() {
  const { id } = useLocalSearchParams<Params>();
  const order = orders.find((order) => order.id === id);

  if (!order) {
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
        <Container className="gap-6 px-12">
          <Text className="text-center text-base text-white">
            Pedido nº {order.id} - {order.date}
          </Text>
          <TextHighlight className="">
            Pedido {ORDER_STATUS_LABEL[order.status]}
            {'  '}
            <FontAwesome size={16} color={ORDER_STATUS_COLOR[order.status]} name="circle" />
          </TextHighlight>

          <View className="gap-4">
            {order.products.map((product) => (
              <View key={product.id} className="flex-row justify-between">
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
            <TextHighlight>{order.deliveryAddress}</TextHighlight>
          </View>

          {order.status === ORDER_STATUS.DELIVERED && !order.feedback?.stars && (
            <Link
              href={{
                pathname: '/order-feedback/[id]',
                params: { id: order.id },
              }}
              asChild>
              <Button>
                <ButtonText>Avaliar Pedido</ButtonText>
              </Button>
            </Link>
          )}

          {order.status === ORDER_STATUS.DELIVERED && order.feedback?.stars && (
            <>
              <Text className="text-center text-2xl text-beige">Sua Avaliação</Text>
              <View className="gap-2">
                <Text className="text-lg text-beige">Produtos:</Text>
                <TextHighlight>{order.feedback.comment || 'Sem comentário.'}</TextHighlight>
                <View className="flex-row items-center justify-between">
                  <Text className="w-1/3 text-lg text-beige">Satisfação:</Text>
                  <StarRatingDisplay
                    rating={order.feedback.stars}
                    starSize={24}
                    color={colors.beige}
                  />
                </View>
              </View>
            </>
          )}

          {order.status === ORDER_STATUS.DELIVERED && order.deliveryFeedback?.stars && (
            <View className="gap-2">
              <Text className="text-lg text-beige">Entrega:</Text>
              <TextHighlight>{order.deliveryFeedback.comment || 'Sem comentário.'}</TextHighlight>
              <View className="flex-row items-center justify-between">
                <Text className="w-1/3 text-lg text-beige">Satisfação:</Text>
                <StarRatingDisplay
                  rating={order.deliveryFeedback.stars}
                  starSize={24}
                  color={colors.beige}
                />
              </View>
            </View>
          )}
        </Container>
      </ScrollViewContainer>
    </>
  );
}
