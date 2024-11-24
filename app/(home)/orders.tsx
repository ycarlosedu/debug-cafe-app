import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { FlatList, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import { Container } from '@/components/container';
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
import { orders } from '@/mocks/orders';
import colors from '@/styles/colors';

export default function Orders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pedidos' }} />
      <Container className="px-4">
        <Accordion
          size="lg"
          variant="filled"
          type="single"
          isCollapsible
          className="w-full bg-transparent">
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AccordionItem value={item.id} className="mt-6 rounded-lg bg-beige">
                <AccordionHeader>
                  <AccordionTrigger className="gap-4">
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText className="flex flex-row items-center text-brown">
                            {item.date} - {ORDER_STATUS_LABEL[item.status]}{' '}
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
                  {item.products.map((product) => (
                    <AccordionContentText key={product.id} className="text-white">
                      x{product.quantity} {product.name}
                    </AccordionContentText>
                  ))}
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
            )}
          />
        </Accordion>
      </Container>
    </>
  );
}
