import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from '@/components/ui/accordion';
import { ORDER_STATUS_COLOR, ORDER_STATUS_ICON, ORDER_STATUS_LABEL } from '@/constants';
import { teamOrders } from '@/services/orders';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';
import { toBrazillianCurrency } from '@/utils/format/currency';
import { toBrazilianDate } from '@/utils/format/date';

export default function MyOrders() {
  const { user } = useAuthStore();

  const { data: orders, isFetched } = useQuery({
    queryKey: ['pending-orders', user?.email],
    queryFn: teamOrders.getPendingOrders,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Pedidos em Andamento' }} />
      <ScrollViewContainer>
        <Container className="px-4">
          {isFetched && !orders?.length && (
            <Text className="text-center text-2xl text-white">Nenhum pedido encontrado...</Text>
          )}
          <Accordion
            size="lg"
            variant="filled"
            type="single"
            isCollapsible
            className="w-full bg-transparent">
            {orders?.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="mt-6 rounded-lg bg-beige">
                <AccordionHeader>
                  <AccordionTrigger className="gap-4">
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText className="flex flex-row items-center text-brown">
                            {toBrazilianDate(item.createdAt)} - {ORDER_STATUS_LABEL[item.status]}{' '}
                          </AccordionTitleText>
                          <FontAwesome6
                            size={16}
                            color={colors.brown}
                            name={ORDER_STATUS_ICON[item.status]}
                          />
                          <FontAwesome
                            size={16}
                            color={ORDER_STATUS_COLOR[item.status]}
                            name="circle"
                          />
                          {isExpanded ? (
                            <FontAwesome color={colors.brown} name="caret-up" size={24} />
                          ) : (
                            <FontAwesome color={colors.brown} name="caret-down" size={24} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="flex flex-col gap-5">
                  <AccordionContentText className="text-white">
                    {item.address.street}, {item.address.number}
                  </AccordionContentText>
                  <AccordionContentText className="text-white">
                    {toBrazillianCurrency(item.totalPrice)}
                  </AccordionContentText>
                  {item.feedback?.stars && (
                    <View className="flex-row items-center">
                      <AccordionContentText className="text-brown">
                        Avaliação -
                      </AccordionContentText>
                      <StarRatingDisplay
                        rating={item.feedback?.stars}
                        starSize={24}
                        color={colors.brown}
                      />
                    </View>
                  )}
                  <Link
                    href={{
                      pathname: '/pending-order/[id]',
                      params: { id: item.id },
                    }}
                    className="flex flex-row items-center justify-center gap-1 rounded-lg bg-brown px-2 py-3">
                    <AccordionContentText className="text-center text-beige">
                      Ver Mais detalhes
                    </AccordionContentText>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
