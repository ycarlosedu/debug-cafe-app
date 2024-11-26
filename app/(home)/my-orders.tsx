import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import Loader from '@/components/loader';
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
import { ORDER_STATUS_COLOR, ORDER_STATUS_ICON, ORDER_STATUS_LABEL, USER_TYPE } from '@/constants';
import { myOrders } from '@/services/orders';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';
import { toBrazillianCurrency } from '@/utils/format/currency';
import { toBrazilianDate } from '@/utils/format/date';

export default function MyOrders() {
  const { user, handleLogout } = useAuthStore();

  const {
    data: orders,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: myOrders.getAll,
    enabled: user?.userType !== USER_TYPE.GUEST,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pedidos' }} />
      <ScrollViewContainer>
        <Container className="px-4">
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
          {isFetched && !orders?.length && (
            <Text className="text-center text-xl text-white">Você ainda não realizou pedidos.</Text>
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
                        rating={item.feedback.stars}
                        starSize={24}
                        color={colors.brown}
                      />
                    </View>
                  )}
                  <Link
                    href={{
                      pathname: '/order/[id]',
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
